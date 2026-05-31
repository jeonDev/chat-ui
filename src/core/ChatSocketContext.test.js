import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ChatSocketProvider, useChatSocketContext } from './ChatSocketContext';

jest.mock('./AuthContext', () => ({
  useAuth: () => ({ user: { id: 7 } }),
}));

class MockWebSocket {
  static OPEN = 1;
  static instances = [];

  constructor(url, protocols) {
    this.url = url;
    this.protocols = protocols;
    this.readyState = MockWebSocket.OPEN;
    this.send = jest.fn();
    this.close = jest.fn();
    MockWebSocket.instances.push(this);
  }
}

const SocketConsumer = () => {
  const { messagesByRoom, sendMessage } = useChatSocketContext();
  const messages = messagesByRoom[3] || [];

  return (
    <>
      <button type="button" onClick={() => sendMessage(3, 'hello')}>send</button>
      <span>{messages[0]?.content.text || ''}</span>
    </>
  );
};

beforeEach(() => {
  MockWebSocket.instances = [];
  global.WebSocket = MockWebSocket;
  localStorage.setItem('accessToken', 'test-jwt');
});

test('connects after authentication and exchanges room messages', () => {
  render(
    <ChatSocketProvider>
      <SocketConsumer />
    </ChatSocketProvider>
  );

  const socket = MockWebSocket.instances[0];
  expect(socket.url).toBe('ws://localhost:8090/ws/chat');
  expect(socket.protocols).toEqual(['jwt', 'test-jwt']);

  fireEvent.click(screen.getByRole('button', { name: 'send' }));
  expect(socket.send).toHaveBeenCalledWith(JSON.stringify({
    roomId: 3,
    messageType: 'TEXT',
    content: { text: 'hello' },
  }));

  act(() => {
    socket.onmessage({
      data: JSON.stringify({
        messageId: 1,
        roomId: 3,
        senderMemberId: 7,
        messageType: 'TEXT',
        content: { text: 'hello' },
        sentAt: '2026-05-31T12:00:00',
      }),
    });
  });

  expect(screen.getByText('hello')).toBeInTheDocument();
});
