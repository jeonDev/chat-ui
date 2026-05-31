import apiClient from '../../api/ApiClient';
import { friendApi } from './FriendApi';

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

test('searches friends by keyword', async () => {
  apiClient.get.mockResolvedValue({ data: [] });

  await friendApi.searchFriends('010-1234');

  expect(apiClient.get).toHaveBeenCalledWith('/api/v1/friends/search', {
    params: { keyword: '010-1234' },
  });
});

test('adds a friend by member id', async () => {
  apiClient.post.mockResolvedValue({ data: { memberId: 2 } });

  await friendApi.addFriend(2);

  expect(apiClient.post).toHaveBeenCalledWith('/api/v1/friends', {
    friendMemberId: 2,
  });
});
