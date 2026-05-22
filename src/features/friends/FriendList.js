import React, { useEffect, useState } from 'react';
import { friendApi } from './FriendApi';
import { Plus } from 'lucide-react';

export const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await friendApi.getFriends();
        setFriends(data);
      } catch (error) {
        console.error('Failed to fetch friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <div className="status-text loading">Loading friends...</div>;

  return (
    <div className="tab-panel">
      <div className="section-title-row">
        <h2>친구 목록</h2>
        <span>{friends.length}명</span>
      </div>
      
      <div className="list-stack">
        {friends.length === 0 ? (
          <div className="empty-state">
            <strong>친구가 없습니다.</strong>
            <p>새로운 친구를 찾아보세요!</p>
          </div>
        ) : (
          friends.map(friend => (
            <div key={friend.id} className="person-row">
              <div className="avatar">
                {friend.name?.[0] || 'U'}
              </div>
              <div className="row-main">
                <strong>{friend.name}</strong>
                <span>{friend.status === 'online' ? '접속 중' : '미접속'}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="inline-form" style={{ marginTop: '20px' }}>
        <input placeholder="친구 ID로 검색" />
        <button className="primary-button compact">
          <Plus size={18} style={{ marginRight: '4px' }} />
          친구 추가
        </button>
      </div>
    </div>
  );
};
