import { Routes, Route } from 'react-router-dom';
import { useAuth } from './lib/auth/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Artworks from './pages/Artworks';
import Artists from './pages/Artists';
import Locations from './pages/Locations';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/artworks" element={<Artworks />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        )}
      </Routes>
    </ErrorBoundary>
  );
}