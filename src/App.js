import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './core/AuthContext';
import { ChatSocketProvider } from './core/ChatSocketContext';
import { ProtectedRoute, PublicRoute } from './core/ProtectedRoute';
import { MainLayout } from './pages/MainLayout';
import { LoginPage } from './features/auth/LoginPage';
import { SignUpPage } from './features/auth/SignUpPage';
import { FriendList } from './features/friends/FriendList';
import { RoomList } from './features/chat/RoomList';
import { ChatRoom } from './features/chat/ChatRoom';
import { MyPage } from './features/profile/MyPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ChatSocketProvider>
        <div className="app-stage">
          <div className="phone-shell">
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Navigate to="/chat" replace />} />
                    <Route path="/friends" element={<FriendList />} />
                    <Route path="/chat" element={<RoomList />} />
                    <Route path="/profile" element={<MyPage />} />
                  </Route>
                  <Route path="/chat/:roomId" element={<ChatRoom />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </ChatSocketProvider>
    </AuthProvider>
  );
}

export default App;
