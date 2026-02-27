import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useToast } from '../hooks/useToast';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAdminAuth();
  const { pushToast } = useToast();

  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const redirectPath = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await login(form);
      pushToast({ type: 'success', title: 'Login successful', message: 'Welcome to admin dashboard' });
      navigate(redirectPath, { replace: true });
    } catch (error) {
      pushToast({ type: 'error', title: 'Login failed', message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <p>Authorized access only</p>

        <label htmlFor="admin-email">Email</label>
        <input
          id="admin-email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="admin@luxe.com"
          required
        />

        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          placeholder="••••••••"
          required
        />

        <button type="submit" disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </section>
  );
};

export default AdminLoginPage;

