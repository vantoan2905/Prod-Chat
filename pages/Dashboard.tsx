import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FileText, Database, Clock, Search, ArrowRight } from 'lucide-react';
import { MOCK_DOCUMENTS } from '../constants';
import { Link } from 'react-router-dom';
import { ProcessStatus } from '../types';

const Dashboard: React.FC = () => {
  const totalDocs = MOCK_DOCUMENTS.length;
  const recentDocs = MOCK_DOCUMENTS.slice(0, 3);
  
  // Data for Charts
  const typeData = [
    { name: 'PDF', value: 4 },
    { name: 'DOCX', value: 3 },
    { name: 'Excel', value: 2 },
    { name: 'Image', value: 1 },
  ];
  const COLORS = ['#374151', '#6b7280', '#9ca3af', '#d1d5db'];

  const usageData = [
    { name: 'T2', docs: 2 },
    { name: 'T3', docs: 5 },
    { name: 'T4', docs: 3 },
    { name: 'T5', docs: 8 },
    { name: 'T6', docs: 4 },
    { name: 'T7', docs: 1 },
    { name: 'CN', docs: 0 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Search Header */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Tìm kiếm tài liệu, nội dung..." 
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tổng tài liệu</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalDocs}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Database size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Dung lượng</p>
            <h3 className="text-2xl font-bold text-gray-900">128.5 MB</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Xử lý xong</p>
            <h3 className="text-2xl font-bold text-gray-900">98%</h3>
          </div>
        </div>
      </div>

      {/* Charts & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Usage Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Hoạt động tải lên (7 ngày qua)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                  cursor={{fill: '#f9fafb'}}
                />
                <Bar dataKey="docs" fill="#4b5563" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Access / Recent Docs */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Truy cập nhanh</h3>
            <Link to="/documents" className="text-sm text-blue-600 hover:underline">Xem tất cả</Link>
          </div>
          <div className="space-y-4 flex-1">
            {recentDocs.map(doc => (
              <div key={doc.id} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                  <p className="text-xs text-gray-500">{new Date(doc.uploadDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  doc.status === ProcessStatus.COMPLETED ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {doc.status === ProcessStatus.COMPLETED ? 'Sẵn sàng' : 'Đang xử lý'}
                </span>
              </div>
            ))}
          </div>
          
          <Link to="/chat" className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all">
            <MessageSquareIcon />
            Hỏi AI ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

const MessageSquareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default Dashboard;