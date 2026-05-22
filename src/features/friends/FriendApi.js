import apiClient from '../../api/ApiClient';

export const friendApi = {
  getFriends: async () => {
    const response = await apiClient.get('/api/v1/friends');
    return response.data;
  },
  addFriend: async (targetLoginId) => {
    const response = await apiClient.post('/api/v1/friends', { targetLoginId });
    return response.data;
  }
};
