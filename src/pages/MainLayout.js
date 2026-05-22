import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, MessageSquare, User } from 'lucide-react';

export const MainLayout = () => {
  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header className="app-header">
        <h1>Netty Chat</h1>
      </header>
      
      <main className="content-scroll">
        <Outlet />
      </main>

      <footer className="bottom-tabs">
        <NavLink 
          to="/friends" 
          className={({ isActive }) => isActive ? 'tab-active' : ''}
          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <button style={{ background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Users size={24} />
            <span>친구</span>
          </button>
        </NavLink>
        <NavLink 
          to="/chat" 
          className={({ isActive }) => isActive ? 'tab-active' : ''}
          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <button style={{ background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <MessageSquare size={24} />
            <span>채팅</span>
          </button>
        </NavLink>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => isActive ? 'tab-active' : ''}
          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <button style={{ background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <User size={24} />
            <span>마이페이지</span>
          </button>
        </NavLink>
      </footer>
    </div>
  );
};
