import { useCallback } from 'react';
import { useChatSocketContext } from '../../core/ChatSocketContext';

export const useChatSocket = (roomId) => {
  const {
    isConnected,
    messagesByRoom,
    replaceRoomMessages,
    sendMessage: sendSocketMessage,
  } = useChatSocketContext();

  const setMessages = useCallback((messages) => {
    replaceRoomMessages(roomId, messages);
  }, [replaceRoomMessages, roomId]);

  const sendMessage = useCallback((text) => (
    sendSocketMessage(roomId, text)
  ), [roomId, sendSocketMessage]);

  return {
    messages: messagesByRoom[roomId] || [],
    setMessages,
    isConnected,
    sendMessage,
  };
};
