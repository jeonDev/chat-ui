import React, { useCallback, useEffect, useState } from 'react';
import { Check, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { chatApi } from '../chat/ChatApi';
import { friendApi } from './FriendApi';

export const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [openingFriendId, setOpeningFriendId] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const fetchFriends = useCallback(async () => {
    try {
      const data = await friendApi.getFriends();
      setFriends(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch friends:', error);
      setStatus({ type: 'error', message: '친구 목록을 불러오지 못했습니다.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const normalizedKeyword = keyword.trim();

    if (!normalizedKeyword) {
      setStatus({ type: 'error', message: '이름 또는 핸드폰 번호를 입력하세요.' });
      return;
    }

    setSearching(true);
    setStatus({ type: '', message: '' });

    try {
      const data = await friendApi.searchFriends(normalizedKeyword);
      setSearchResults(Array.isArray(data) ? data : []);
      setSearched(true);
    } catch (error) {
      console.error('Failed to search friends:', error);
      setSearchResults([]);
      setSearched(true);
      setStatus({ type: 'error', message: '친구 검색에 실패했습니다.' });
    } finally {
      setSearching(false);
    }
  };

  const handleAddFriend = async (friend) => {
    if (friend.alreadyFriend) {
      return;
    }

    setStatus({ type: '', message: '' });

    try {
      const addedFriend = await friendApi.addFriend(friend.memberId);
      setFriends((current) => upsertFriend(current, addedFriend));
      setSearchResults((current) => current.map((item) => (
        item.memberId === friend.memberId ? { ...item, alreadyFriend: true } : item
      )));
      setStatus({ type: 'success', message: `${friend.name}님을 친구로 추가했습니다.` });
    } catch (error) {
      console.error('Failed to add friend:', error);
      setStatus({ type: 'error', message: '친구 추가에 실패했습니다.' });
    }
  };

  const handleOpenChat = async (friend) => {
    setOpeningFriendId(friend.memberId);
    setStatus({ type: '', message: '' });

    try {
      const room = await chatApi.createDirectRoom(friend.memberId);
      navigate(`/chat/${room.roomId}`);
    } catch (error) {
      console.error('Failed to create direct room:', error);
      setStatus({ type: 'error', message: '채팅방을 열지 못했습니다.' });
      setOpeningFriendId(null);
    }
  };

  if (loading) {
    return <div className="status-text loading">친구 목록을 불러오는 중입니다.</div>;
  }

  return (
    <div className="tab-panel">
      <div className="section-title-row">
        <h2>친구 목록</h2>
        <span>{friends.length}명</span>
      </div>

      <form className="inline-form friend-search-form" onSubmit={handleSearch}>
        <label>
          친구 검색
          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="이름 또는 핸드폰 번호"
          />
        </label>
        <button className="primary-button compact" disabled={searching} type="submit">
          <Search size={18} />
          {searching ? '검색 중' : '검색'}
        </button>
      </form>

      {searched ? (
        <section className="search-results" aria-label="친구 검색 결과">
          <div className="section-title-row">
            <h2>검색 결과</h2>
            <span>{searchResults.length}명</span>
          </div>
          {searchResults.length === 0 ? (
            <div className="empty-state">
              <strong>검색 결과가 없습니다.</strong>
              <p>이름이나 핸드폰 번호를 다시 확인해주세요.</p>
            </div>
          ) : (
            <div className="list-stack">
              {searchResults.map((friend) => (
                <button
                  className="person-row search-result-row"
                  disabled={friend.alreadyFriend}
                  key={friend.memberId}
                  onClick={() => handleAddFriend(friend)}
                  type="button"
                >
                  <FriendAvatar name={friend.name} />
                  <div className="row-main">
                    <strong>{friend.name}</strong>
                    <span>{friend.phone || '핸드폰 번호 없음'}</span>
                  </div>
                  {friend.alreadyFriend ? <Check size={18} /> : <Plus size={18} />}
                </button>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {status.message ? <div className={`status-text ${status.type}`}>{status.message}</div> : null}

      <div className="section-title-row">
        <h2>내 친구</h2>
        <span>{friends.length}명</span>
      </div>

      <div className="list-stack">
        {friends.length === 0 ? (
          <div className="empty-state">
            <strong>친구가 없습니다.</strong>
            <p>이름이나 핸드폰 번호로 친구를 검색해보세요.</p>
          </div>
        ) : (
          friends.map((friend) => (
            <button
              className="person-row friend-row"
              disabled={openingFriendId === friend.memberId}
              key={friend.memberId}
              onClick={() => handleOpenChat(friend)}
              type="button"
            >
              <FriendAvatar name={friend.name} />
              <div className="row-main">
                <strong>{friend.name}</strong>
                <span>{openingFriendId === friend.memberId ? '채팅방을 여는 중입니다.' : friend.phone || '핸드폰 번호 없음'}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

const FriendAvatar = ({ name }) => (
  <div className="avatar">
    {name?.[0] || 'U'}
  </div>
);

const upsertFriend = (friends, addedFriend) => {
  if (friends.some((friend) => friend.memberId === addedFriend.memberId)) {
    return friends.map((friend) => (friend.memberId === addedFriend.memberId ? addedFriend : friend));
  }

  return [addedFriend, ...friends];
};
