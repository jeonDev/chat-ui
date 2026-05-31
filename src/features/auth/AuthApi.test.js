import apiClient from '../../api/ApiClient';
import { authApi } from './AuthApi';

jest.mock('../../api/ApiClient', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('includes phone when joining', async () => {
  apiClient.post.mockResolvedValue({ data: null });

  await authApi.join('jhjeon', 'password1234', '전종현', '010-1234-5678');

  expect(apiClient.post).toHaveBeenCalledWith('/api/v1/join', {
    loginId: 'jhjeon',
    password: 'password1234',
    name: '전종현',
    phone: '010-1234-5678',
  });
});
