import React, { useState } from 'react';
import { Button } from '../components/Button';
import { AVAILABLE_MODELS } from '../constants';
import { User } from '../types';
import { Save, Bell, Shield, Moon, Cpu } from 'lucide-react';

interface SettingsProps {
    user: User;
}

export const Settings: React.FC<SettingsProps> = ({ user }) => {
    const [name, setName] = useState(user.name);
    const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>

            <div className="space-y-6">
                
                {/* Account Settings */}
                <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-gray-500" />
                        Tài khoản & Bảo mật
                    </h2>
                    <div className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 outline-none" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                                type="email" 
                                value={user.email} 
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" 
                            />
                        </div>
                        <Button className="mt-2">Lưu thay đổi</Button>
                    </div>
                </section>

                {/* AI Configuration */}
                <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Cpu size={20} className="text-gray-500" />
                        Cấu hình AI
                    </h2>
                    <div className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mô hình mặc định</label>
                            <select 
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 outline-none bg-white"
                            >
                                {AVAILABLE_MODELS.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">Chọn mô hình phù hợp với nhu cầu tốc độ hoặc độ chính xác.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="allowDocs" className="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900" defaultChecked />
                            <label htmlFor="allowDocs" className="text-sm text-gray-700">Cho phép AI tự động đọc tài liệu mới tải lên để tóm tắt</label>
                        </div>
                    </div>
                </section>

                {/* Preferences */}
                <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Bell size={20} className="text-gray-500" />
                        Tùy chọn chung
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Thông báo email</p>
                                <p className="text-xs text-gray-500">Nhận thông báo khi tài liệu xử lý xong</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                            </label>
                        </div>
                         <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Giao diện tối (Dark Mode)</p>
                                <p className="text-xs text-gray-500">Chuyển sang giao diện tối (Chưa khả dụng)</p>
                            </div>
                             <label className="relative inline-flex items-center cursor-not-allowed opacity-60">
                                <input type="checkbox" className="sr-only peer" disabled />
                                <div className="w-11 h-6 bg-gray-200 rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5"></div>
                            </label>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};