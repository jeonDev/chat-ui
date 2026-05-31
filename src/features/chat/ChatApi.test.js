import apiClient from '../../api/ApiClient';
import { chatApi } from './ChatApi';

jest.mock('../../api/ApiClient', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('creates a direct room with the partner member id', async () => {
  apiClient.post.mockResolvedValue({ data: { roomId: 1 } });

  await chatApi.createDirectRoom(2);

  expect(apiClient.post).toHaveBeenCalledWith('/api/v1/rooms/direct', {
    partnerMemberId: 2,
  });
});

test('loads room messages when opening a room', async () => {
  apiClient.get.mockResolvedValue({ data: [] });

  await chatApi.getMessages(3);

  expect(apiClient.get).toHaveBeenCalledWith('/api/v1/rooms/3/messages');
});

test('loads joined rooms for the authenticated member', async () => {
  apiClient.get.mockResolvedValue({ data: [] });

  await chatApi.getRooms();

  expect(apiClient.get).toHaveBeenCalledWith('/api/v1/rooms');
});
