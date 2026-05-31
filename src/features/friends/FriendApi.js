import apiClient from '../../api/ApiClient';

export const friendApi = {
  getFriends: async () => {
    const response = await apiClient.get('/api/v1/friends');
    return response.data;
  },
  searchFriends: async (keyword) => {
    const response = await apiClient.get('/api/v1/friends/search', { params: { keyword } });
    return response.data;
  },
  addFriend: async (friendMemberId) => {
    const response = await apiClient.post('/api/v1/friends', { friendMemberId });
    return response.data;
  },
};
