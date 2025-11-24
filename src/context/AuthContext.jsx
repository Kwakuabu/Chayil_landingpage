import { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);
  const [pending2FAEmail, setPending2FAEmail] = useState(null);

  // Helper function to wait until google is loaded via load/error event flags
  const waitForGoogle = () => {
    return new Promise((resolve, reject) => {
      const timeout = 15000; // 15 seconds timeout
      const intervalTime = 100;
      let elapsedTime = 0;

      if (window.googleApiLoaded) {
        resolve();
        return;
      }

      if (window.googleApiLoadFailed) {
        reject(new Error('Google API failed to load'));
        return;
      }

      const interval = setInterval(() => {
        if (window.googleApiLoaded) {
          clearInterval(interval);
          resolve();
        } else if (window.googleApiLoadFailed) {
          clearInterval(interval);
          reject(new Error('Google API failed to load'));
        } else {
          elapsedTime += intervalTime;
          if (elapsedTime >= timeout) {
            clearInterval(interval);
            reject(new Error('Google API load timed out'));
          }
        }
      }, intervalTime);
    });
  };

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      apiService.setAuthToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiService.login({ email, password });

      // Handle common response shapes from backend
      if (response?.requires2FA) {
        setRequires2FA(true);
        setPending2FAEmail(email);
        return { success: true, requires2FA: true };
      }

      // normalize token and user
      const token = response?.token || response?.access_token || response?.data?.token || response?.data?.access_token;
      const userData = response?.user || response?.data?.user || response?.data?.userData || response?.data;

      if (token && userData) {
        setUser(userData);
        apiService.setAuthToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", token);
        return { success: true, user: userData };
      }

      return { success: false, error: "Invalid response from server" };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const verify2FA = async (code) => {
    try {
      setLoading(true);
      // send both email and token as backend expects
      const payload = { token: code, email: pending2FAEmail };
      const response = await apiService.verify2FA(payload);

      const token = response?.token || response?.access_token || response?.data?.token;
      const userData = response?.user || response?.data?.user || response?.data;

      if (token && userData) {
        setUser(userData);
        setRequires2FA(false);
        setPending2FAEmail(null);
        apiService.setAuthToken(token);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", token);

        return { success: true, user: userData };
      }

      return { success: false, error: "Invalid 2FA code" };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setRequires2FA(false);
    setPending2FAEmail(null);
    apiService.clearAuthToken();
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await apiService.register(userData);

      // normalize possible response
      const token = response?.token || response?.access_token || response?.data?.token;
      const user = response?.user || response?.data?.user || response?.data;
      if (token && user) {
        setUser(user);
        apiService.setAuthToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        return { success: true, user };
      }

      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      await apiService.forgotPassword(email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await apiService.refreshToken();
      if (response.token) {
        apiService.setAuthToken(response.token);
        localStorage.setItem("authToken", response.token);
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      logout(); // Token refresh failed, logout user
      return { success: false };
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      await waitForGoogle();

      return new Promise((resolve, reject) => {
        const client = google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: 'openid email profile',
          callback: async (response) => {
            if (response.access_token) {
              try {
                const apiResponse = await apiService.googleLogin({ token: response.access_token });
                const token = apiResponse?.token || apiResponse?.access_token || apiResponse?.data?.token;
                const userData = apiResponse?.user || apiResponse?.data?.user || apiResponse?.data;
                if (token && userData) {
                  setUser(userData);
                  apiService.setAuthToken(token);
                  localStorage.setItem('user', JSON.stringify(userData));
                  localStorage.setItem('authToken', token);
                  resolve({ success: true, user: userData });
                  return;
                }
                resolve({ success: false, error: 'Google login failed' });
              } catch (error) {
                resolve({ success: false, error: error.message });
              }
            } else {
              resolve({ success: false, error: 'Google login failed' });
            }
          },
        });
        client.requestAccessToken();
      });
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    setLoading(true);
    try {
      await waitForGoogle();

      return new Promise((resolve, reject) => {
        const client = google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: 'openid email profile',
          callback: async (response) => {
            if (response.access_token) {
              try {
                const apiResponse = await apiService.googleSignup({ token: response.access_token });
                const token = apiResponse?.token || apiResponse?.access_token || apiResponse?.data?.token;
                const userData = apiResponse?.user || apiResponse?.data?.user || apiResponse?.data;
                if (token && userData) {
                  setUser(userData);
                  apiService.setAuthToken(token);
                  localStorage.setItem('user', JSON.stringify(userData));
                  localStorage.setItem('authToken', token);
                  resolve({ success: true, user: userData });
                  return;
                }
                resolve({ success: false, error: 'Google signup failed' });
              } catch (error) {
                resolve({ success: false, error: error.message });
              }
            } else {
              resolve({ success: false, error: 'Google signup failed' });
            }
          },
        });
        client.requestAccessToken();
      });
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    signup,
    googleLogin,
    googleSignup,
    forgotPassword,
    verify2FA,
    refreshToken,
    loading,
    requires2FA,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isClient: user?.role === "client",
    isAnalyst: user?.role === "analyst",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
