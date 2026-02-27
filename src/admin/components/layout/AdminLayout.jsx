import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { adminNavigation } from '../../config/adminNavigation';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import ToastStack from '../common/ToastStack';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { adminUser, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">LUXE FASHION Admin</div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {adminNavigation.map((item) => (
            <NavLink key={item.key} to={item.path} className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <section className="admin-main-wrap">
        <header className="admin-topbar">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {adminUser?.name}</p>
          </div>
          <button type="button" className="admin-logout-btn" onClick={handleLogout}>Logout</button>
        </header>

        <main className="admin-main-content">
          <Outlet />
        </main>
      </section>
      <ToastStack />
    </div>
  );
};

export default AdminLayout;

