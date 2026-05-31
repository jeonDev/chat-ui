import apiClient from '../../api/ApiClient';

export const authApi = {
  login: async (loginId, password) => {
    const response = await apiClient.post('/api/v1/login', { loginId, password });
    return response.data; // { accessToken }
  },
  join: async (loginId, password, name, phone) => {
    const response = await apiClient.post('/api/v1/join', { loginId, password, name, phone });
    return response.data;
  },
};
