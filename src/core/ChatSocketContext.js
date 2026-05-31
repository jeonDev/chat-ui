import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthContext';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8090/ws/chat';
const ChatSocketContext = createContext(null);

export const ChatSocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [messagesByRoom, setMessagesByRoom] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user?.id) {
      setConnectionStatus('idle');
      setMessagesByRoom({});
      return undefined;
    }

    setConnectionStatus('connecting');
    const socket = new WebSocket(`${WS_URL}?memberId=${encodeURIComponent(user.id)}`);
    socketRef.current = socket;

    socket.onopen = () => setConnectionStatus('open');
    socket.onerror = () => setConnectionStatus('error');
    socket.onclose = () => {
      setConnectionStatus('closed');
      socketRef.current = null;
    };
    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const message = payload.message || payload;

        if (!message.roomId) {
          return;
        }

        setMessagesByRoom((current) => ({
          ...current,
          [message.roomId]: appendUniqueMessages(current[message.roomId] || [], [message]),
        }));
      } catch (error) {
        console.error('Failed to parse chat message:', error);
      }
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [user?.id]);

  const replaceRoomMessages = useCallback((roomId, messages) => {
    setMessagesByRoom((current) => ({
      ...current,
      [roomId]: appendUniqueMessages(messages, current[roomId] || []),
    }));
  }, []);

  const sendMessage = useCallback((roomId, text) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      return false;
    }

    socketRef.current.send(JSON.stringify({
      roomId: Number(roomId),
      messageType: 'TEXT',
      content: { text },
    }));
    return true;
  }, []);

  const value = useMemo(() => ({
    connectionStatus,
    isConnected: connectionStatus === 'open',
    messagesByRoom,
    replaceRoomMessages,
    sendMessage,
  }), [connectionStatus, messagesByRoom, replaceRoomMessages, sendMessage]);

  return (
    <ChatSocketContext.Provider value={value}>
      {children}
    </ChatSocketContext.Provider>
  );
};

export const useChatSocketContext = () => {
  const context = useContext(ChatSocketContext);

  if (!context) {
    throw new Error('useChatSocketContext must be used within ChatSocketProvider.');
  }

  return context;
};

const appendUniqueMessages = (messages, nextMessages) => {
  const messageIds = new Set(messages.map((message) => message.messageId).filter(Boolean));

  return nextMessages.reduce((current, message) => {
    if (message.messageId && messageIds.has(message.messageId)) {
      return current;
    }
    if (message.messageId) {
      messageIds.add(message.messageId);
    }
    return [...current, message];
  }, [...messages]);
};
