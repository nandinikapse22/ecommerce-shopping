import { adminConfig } from '../config/adminConfig';
import { apiClient, ApiError } from './apiClient';

export const authService = {
  async login({ email, password }) {
    if (email !== adminConfig.adminEmail || password !== adminConfig.adminPassword) {
      throw new ApiError('Invalid admin credentials', 401);
    }

    const user = {
      id: 'admin-1',
      name: 'Super Admin',
      email,
      role: 'admin',
    };

    const token = apiClient.makeJwtLikeToken({
      sub: user.id,
      role: user.role,
      email: user.email,
      iat: Date.now(),
    });

    return { token, user };
  },
};

