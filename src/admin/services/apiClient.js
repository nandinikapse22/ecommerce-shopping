import { adminConfig } from '../config/adminConfig';

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

export const apiClient = {
  async request({ token, action }) {
    await delay();

    if (!token) {
      throw new ApiError('Unauthorized', 401);
    }

    return action();
  },

  makeJwtLikeToken(payload) {
    const body = btoa(JSON.stringify(payload));
    return `mock.${body}.token`;
  },

  decodeJwtLikeToken(token) {
    const parts = token.split('.');
    if (parts.length < 3) return null;
    try {
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  },

  getBaseUrl() {
    return adminConfig.apiBaseUrl;
  },
};

export { ApiError };

