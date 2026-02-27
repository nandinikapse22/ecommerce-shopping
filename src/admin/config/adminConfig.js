export const adminConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  tokenKey: 'admin_jwt_token',
  userKey: 'admin_user',
  dbKey: 'admin_mock_db_v1',
  adminEmail: import.meta.env.VITE_ADMIN_EMAIL || 'admin@luxe.com',
  adminPassword: import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@123',
};

