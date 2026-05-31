import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from './AuthApi';
import { useAuth } from '../../core/AuthContext';

export const LoginPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { accessToken } = await authApi.login(loginId, password);
      if (accessToken) {
        login(accessToken);
        navigate('/');
      } else {
        setError('로그인 토큰을 받지 못했습니다. 서버 상태를 확인해주세요.');
      }
    } catch (err) {
      setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-hero">
        <p className="eyebrow">Netty Chat</p>
        <h1>반갑습니다!</h1>
        <p className="hero-copy">계정에 로그인하여 친구들과 대화를 시작하세요.</p>
      </div>

      <div className="auth-switch">
        <button className="switch-active">로그인</button>
        <Link to="/signup" style={{ textDecoration: 'none', display: 'grid' }}>
          <button style={{ width: '100%' }}>회원가입</button>
        </Link>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          아이디
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="아이디를 입력하세요"
            required
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </label>
        {error && <div className="status-text error">{error}</div>}
        <button type="submit" className="primary-button" style={{ marginTop: '10px' }}>
          로그인
        </button>
      </form>
    </div>
  );
};
