import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isBootstrapping } = useAdminAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return (
      <div className="admin-center-wrap">
        <LoadingSpinner label="Checking access" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;

