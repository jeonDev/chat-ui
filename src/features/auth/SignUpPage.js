import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from './AuthApi';

export const SignUpPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authApi.join(loginId, password, name);
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      if (err.code === 'ERR_NETWORK') {
        alert('네트워크 오류 (Mock: 회원가입 성공 처리)');
        navigate('/login');
      }
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-hero">
        <p className="eyebrow">Netty Chat</p>
        <h1>회원가입</h1>
        <p className="hero-copy">새로운 계정을 만들고 서비스를 이용해보세요.</p>
      </div>

      <div className="auth-switch">
        <Link to="/login" style={{ textDecoration: 'none', display: 'grid' }}>
          <button style={{ width: '100%' }}>로그인</button>
        </Link>
        <button className="switch-active">회원가입</button>
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
        <label>
          이름
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
          />
        </label>
        {error && <div className="status-text error">{error}</div>}
        <button type="submit" className="primary-button" style={{ marginTop: '10px' }}>
          회원가입
        </button>
      </form>
    </div>
  );
};
