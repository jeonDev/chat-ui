import apiClient from '../../api/ApiClient';

export const profileApi = {
  getProfile: async () => {
    const response = await apiClient.get('/api/v1/members/me');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await apiClient.put('/api/v1/members/me', profileData);
    return response.data;
  }
};
