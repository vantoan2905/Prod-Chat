import React, { useState } from 'react';
import { Button } from '../components/Button';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

type AuthMode = 'login' | 'register' | 'forgot-password';

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'forgot-password') {
        setMessage('Một liên kết đặt lại mật khẩu đã được gửi đến email của bạn.');
      } else {
        onLogin({
          id: '123',
          name: name || 'Người dùng Demo',
          email: email,
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">D</div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'login' && 'Chào mừng trở lại'}
            {mode === 'register' && 'Tạo tài khoản mới'}
            {mode === 'forgot-password' && 'Đặt lại mật khẩu'}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {mode === 'login' && 'Đăng nhập để quản lý tài liệu và chat với AI'}
            {mode === 'register' && 'Bắt đầu hành trình quản lý thông minh'}
            {mode === 'forgot-password' && 'Nhập email để nhận hướng dẫn'}
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-6 p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-100">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {mode !== 'forgot-password' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          {mode === 'register' && (
             <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Nhập lại mật khẩu</label>
             <input
               type="password"
               required
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
             />
           </div>
          )}

          <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
            {mode === 'login' && 'Đăng nhập'}
            {mode === 'register' && 'Tạo tài khoản'}
            {mode === 'forgot-password' && 'Gửi liên kết'}
          </Button>
        </form>

        {/* Footer Actions */}
        <div className="mt-6 text-center text-sm space-y-2">
          {mode === 'login' && (
            <>
              <p>
                <button onClick={() => setMode('forgot-password')} className="text-gray-600 hover:text-gray-900 font-medium">
                  Quên mật khẩu?
                </button>
              </p>
              <p className="text-gray-500">
                Chưa có tài khoản?{' '}
                <button onClick={() => setMode('register')} className="text-blue-600 hover:text-blue-700 font-medium">
                  Tạo tài khoản mới
                </button>
              </p>
            </>
          )}

          {mode === 'register' && (
            <p className="text-gray-500">
              Đã có tài khoản?{' '}
              <button onClick={() => setMode('login')} className="text-blue-600 hover:text-blue-700 font-medium">
                Đăng nhập
              </button>
            </p>
          )}

          {mode === 'forgot-password' && (
             <p>
             <button onClick={() => setMode('login')} className="text-gray-600 hover:text-gray-900 font-medium">
               Quay lại đăng nhập
             </button>
           </p>
          )}
        </div>

      </div>
    </div>
  );
};