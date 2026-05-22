import React, { useEffect, useState } from 'react';
import { useAuth } from '../../core/AuthContext';
import { profileApi } from './ProfileApi';
import { LogOut, User } from 'lucide-react';

export const MyPage = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileApi.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="status-text loading">Loading profile...</div>;

  return (
    <div className="tab-panel">
      <h2>마이페이지</h2>
      
      <div className="profile-card">
        <div className="avatar large">
          {profile?.name?.[0] || <User />}
        </div>
        <div className="row-main">
          <strong style={{ fontSize: '18px', color: 'white' }}>{profile?.name}</strong>
          <p>@{profile?.loginId}</p>
        </div>
      </div>

      <div className="profile-form" style={{ marginTop: '10px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label>사용자 이름</label>
          <input value={profile?.name || ''} readOnly />
        </div>
        <div>
          <label>아이디</label>
          <input value={profile?.loginId || ''} readOnly />
        </div>
      </div>
      
      <button 
        onClick={logout}
        className="danger-button"
        style={{ marginTop: '20px' }}
      >
        <LogOut size={18} style={{ marginRight: '8px' }} />
        로그아웃
      </button>
    </div>
  );
};
