// web/src/components/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Hospital, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(credentials.email, credentials.password);
      navigate('/patients');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Soft blue/white blurred background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-200 rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-indigo-200 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-white rounded-full filter blur-2xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative w-full max-w-lg z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl p-5 shadow-xl transform rotate-2">
                <Hospital className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow"></div>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 tracking-tight drop-shadow-sm">
            Healthcare Portal
          </h1>
          <p className="text-blue-700 text-lg font-medium">
            Secure access to patient management
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100 p-10">
          <form className="space-y-7" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm animate-shake">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-blue-800">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300 group-focus-within:text-blue-500 transition-colors" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-blue-100 rounded-xl placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-blue-50 focus:bg-white hover:border-blue-200 text-blue-900"
                  placeholder="Enter your email address"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-blue-800">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300 group-focus-within:text-blue-500 transition-colors" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-blue-100 rounded-xl placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-blue-50 focus:bg-white hover:border-blue-200 text-blue-900"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] shadow"
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                <span>{loading ? 'Signing you in...' : 'Sign In'}</span>
                {!loading && (
                  <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-10 pt-6 border-t border-blue-100">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 shadow-sm">
              <p className="text-sm text-blue-700 text-center mb-2 font-semibold">
                Demo Credentials
              </p>
              <div className="flex flex-col space-y-1 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-blue-500">Email:</span>
                  <span className="font-mono text-sm font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded">
                    admin@general.com
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-blue-500">Password:</span>
                  <span className="font-mono text-sm font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded">
                    password
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-sm text-blue-400">
            © 2025 Healthcare Portal. Secure &amp; Compliant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;