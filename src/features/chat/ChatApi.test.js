import apiClient from '../../api/ApiClient';
import { chatApi } from './ChatApi';

jest.mock('../../api/ApiClient', () => ({
  __esModule: true,
  default: {
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
