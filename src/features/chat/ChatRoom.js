import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft } from 'lucide-react';
import { chatApi } from './ChatApi';
import { useAuth } from '../../core/AuthContext';
import { useChatSocket } from './UseChatSocket';

export const ChatRoom = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [historyStatus, setHistoryStatus] = useState('loading');
  const [sendError, setSendError] = useState('');
  const messagesEndRef = useRef(null);
  
  const { messages, setMessages, isConnected, sendMessage } = useChatSocket(roomId);

  useEffect(() => {
    if (roomId) {
      setHistoryStatus('loading');
      chatApi.getMessages(roomId)
        .then(messages => {
          setMessages(messages);
          setHistoryStatus('success');
        })
        .catch(err => {
          console.error('Failed to load history', err);
          setHistoryStatus('error');
        });
    }
  }, [roomId, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const sent = sendMessage(inputText.trim());
    if (!sent) {
      setSendError('소켓 연결 후 메시지를 보낼 수 있습니다.');
      return;
    }
    setSendError('');
    setInputText('');
  };

  return (
    <div className="app-shell chat-panel" style={{ height: '100%' }}>
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', padding: 0, color: 'inherit' }}>
            <ArrowLeft size={24} />
          </button>
          <h1>채팅방 {roomId}</h1>
        </div>
        <div className={`status-text ${isConnected ? 'success' : 'error'}`} style={{ margin: 0, padding: '4px 8px', fontSize: '10px' }}>
          {isConnected ? '연결됨' : '연결 끊김'}
        </div>
      </header>

      <div className="content-scroll message-list">
        {historyStatus === 'loading' ? <div className="status-text loading">채팅 내용을 불러오는 중입니다.</div> : null}
        {historyStatus === 'error' ? <div className="status-text error">채팅 내용을 불러오지 못했습니다.</div> : null}
        {messages.map((msg, idx) => {
          const isMine = msg.senderMemberId === user?.id;
          return (
            <div key={msg.messageId || idx} className={`message-bubble ${isMine ? 'mine' : 'theirs'}`}>
              <p>{msg.content?.text}</p>
              <span>
                {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {sendError ? <div className="status-text error chat-send-error">{sendError}</div> : null}
      <form className="composer" onSubmit={handleSend} style={{ margin: '18px' }}>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메시지 입력..."
        />
        <button type="submit" className="primary-button small-button">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
