import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import { authService } from '../../lib/auth/AuthService';

export default function ForgotPassword() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await authService.requestPasswordReset(email);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
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
          {t('resetPassword')}
        </h1>

        {status === 'success' ? (
          <div className="text-center">
            <div className="text-green-500 mb-4">
              {t('resetEmailSent')}
            </div>
            <Link
              to="/login"
              className="text-primary hover:text-primary-dark"
            >
              {t('backToLogin')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50"
            >
              {status === 'loading' ? t('sending') : t('sendResetLink')}
            </button>

            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {t('backToLogin')}
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}