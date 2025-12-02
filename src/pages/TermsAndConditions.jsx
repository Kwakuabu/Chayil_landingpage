import { useTheme } from "../context/ThemeContext";

export default function TermsAndConditions() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen py-12 px-6 ${isDark ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-800"} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
        <div className={`p-6 rounded-lg shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <p className="mb-4">
            Welcome to Chayil SecureX. These Terms and Conditions govern your use of our website and services.
          </p>
          <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing our website, you agree to be bound by these terms.
          </p>
          <h2 className="text-xl font-semibold mb-2">Use of Services</h2>
          <p className="mb-4">
            Our services are provided for informational and professional purposes only.
          </p>
          <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
          <p className="mb-4">
            Chayil SecureX shall not be liable for any indirect damages arising from your use of our services.
          </p>
          <p>
            For questions, contact us at legal@chayilsecurex.com.
          </p>
        </div>
      </div>
    </div>
  );
}
