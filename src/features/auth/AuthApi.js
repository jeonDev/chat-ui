import apiClient from '../../api/ApiClient';

export const authApi = {
  login: async (loginId, password) => {
    const response = await apiClient.post('/api/v1/login', { loginId, password });
    return response.data; // { accessToken }
  },
  join: async (loginId, password, name) => {
    const response = await apiClient.post('/api/v1/join', { loginId, password, name });
    return response.data;
  },
};
