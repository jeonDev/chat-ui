import { useEffect, useRef, useState, useCallback } from 'react';

export const useChatSocket = (memberId, roomId) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!memberId || !roomId) return;

    const wsUrl = `ws://localhost:8090/ws/chat?memberId=${memberId}`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Based on ChatPayload.WebSocketSendResponse
        if (data.message && data.message.roomId === Number(roomId)) {
          setMessages(prev => [...prev, data.message]);
        }
      } catch (err) {
        console.error('Failed to parse message', err);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [memberId, roomId]);

  const sendMessage = useCallback((text) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const payload = {
        roomId: Number(roomId),
        messageType: 'TEXT',
        content: { text }
      };
      socketRef.current.send(JSON.stringify(payload));
    }
  }, [roomId]);

  return { messages, setMessages, isConnected, sendMessage };
};
