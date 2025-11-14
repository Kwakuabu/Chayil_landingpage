import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);

    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/background5.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="flex justify-center items-center py-20 min-h-screen">
        <div className="bg-gray-900 p-8 rounded-lg shadow max-w-md w-full border border-teal-500/20 relative z-10">
        <h2 className="text-2xl font-semibold mb-2 text-cyan-300">Create Account</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-800 border border-teal-500/20 p-2 rounded text-gray-300 placeholder-gray-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-black py-2 rounded hover:bg-teal-400 transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-4">
          Already have an account? <Link to="/login" className="text-teal-400 hover:text-cyan-300">Login</Link>
        </p>
        </div>
      </div>
    </div>
  );
}
