import apiClient from '../../api/ApiClient';

export const chatApi = {
  getRooms: async (memberId) => {
    const response = await apiClient.get(`/api/v1/rooms`, { params: { memberId } });
    return response.data;
  },
  getMessages: async (roomId) => {
    const response = await apiClient.get(`/api/v1/rooms/${roomId}/messages`);
    return response.data;
  },
  createDirectRoom: async (partnerMemberId) => {
    const response = await apiClient.post('/api/v1/rooms/direct', { partnerMemberId });
    return response.data;
  },
};
