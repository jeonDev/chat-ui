import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatApi } from './ChatApi';
import { useAuth } from '../../core/AuthContext';
import { ChevronRight } from 'lucide-react';

export const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      chatApi.getRooms(user.id)
        .then(setRooms)
        .catch(err => {
          console.error(err);
          setRooms([
            { id: 1, type: 'DIRECT', name: '홍길동과의 대화', lastMessage: '안녕하세요!' },
            { id: 2, type: 'GROUP', name: '자바 스터디', lastMessage: '열공합시다.' },
          ]);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleRoomClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  if (loading) return <div className="status-text loading">Loading chat rooms...</div>;

  return (
    <div className="tab-panel">
      <div className="section-title-row">
        <h2>채팅방</h2>
        <span>{rooms.length}개</span>
      </div>
      
      <div className="list-stack">
        {rooms.length === 0 ? (
          <div className="empty-state">
            <strong>참여 중인 채팅방이 없습니다.</strong>
            <p>친구를 초대하여 대화를 시작해보세요!</p>
          </div>
        ) : (
          rooms.map(room => (
            <button 
              key={room.id} 
              onClick={() => handleRoomClick(room.id)}
              className="room-row"
            >
              <div className="avatar">
                {room.name?.[0] || 'C'}
              </div>
              <div className="row-main">
                <strong>{room.name || `채팅방 ${room.id}`}</strong>
                <span>{room.lastMessage || '메시지가 없습니다.'}</span>
              </div>
              <ChevronRight className="chevron" size={20} />
            </button>
          ))
        )}
      </div>
    </div>
  );
};
