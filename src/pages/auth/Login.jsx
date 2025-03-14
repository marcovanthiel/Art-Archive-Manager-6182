import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import { useAuth } from '../../lib/auth/AuthContext';

export default function Login() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Clear any existing auth state on login page mount
    localStorage.removeItem('authToken');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', { email: formData.email, password: '[HIDDEN]' });
      await login(formData.email, formData.password);
      console.log('Login successful, navigating to dashboard');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Art Archive
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('email')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('password')}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary-dark"
            >
              {t('forgotPassword')}
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50"
          >
            {isLoading ? t('signingIn') : t('signIn')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}