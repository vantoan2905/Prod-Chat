import React, { useState } from 'react';
import { MOCK_DOCUMENTS } from '../constants';
import { DocType, ViewMode, Document } from '../types';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreVertical, 
  FileText, 
  Image as ImageIcon, 
  FileSpreadsheet,
  UploadCloud,
  X,
  Settings2
} from 'lucide-react';
import { Button } from '../components/Button';

const Documents: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filterType, setFilterType] = useState<DocType | 'ALL'>('ALL');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  // Grid View Customization State
  const [showCustomizeMenu, setShowCustomizeMenu] = useState(false);
  const [gridConfig, setGridConfig] = useState({
    showDate: true,
    showSize: true,
    showTags: true,
  });

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => 
    filterType === 'ALL' ? true : doc.type === filterType
  );

  const getIcon = (type: DocType) => {
    switch (type) {
      case DocType.IMAGE: return <ImageIcon className="text-purple-500" />;
      case DocType.EXCEL: return <FileSpreadsheet className="text-green-500" />;
      default: return <FileText className="text-blue-500" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-screen flex flex-col">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý tài liệu</h1>
          <p className="text-gray-500 text-sm mt-1">{filteredDocs.length} tài liệu</p>
        </div>
        
        <div className="flex items-center gap-3">
           {/* Fake Upload Button */}
           <label className="cursor-pointer bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2 text-sm font-medium">
              <UploadCloud size={18} />
              Tải lên
              <input type="file" className="hidden" />
           </label>
        </div>
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Tìm theo tên, tag..." 
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 w-full sm:w-64"
            />
          </div>
          <div className="relative group">
             <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                <Filter size={16} />
                <span className="hidden sm:inline">Lọc</span>
             </button>
             {/* Simple Dropdown for Filter */}
             <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-100 shadow-lg rounded-lg hidden group-hover:block z-10 p-1">
                <button onClick={() => setFilterType('ALL')} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">Tất cả</button>
                <button onClick={() => setFilterType(DocType.PDF)} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">PDF</button>
                <button onClick={() => setFilterType(DocType.DOCX)} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">DOCX</button>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
            {/* Customize View Button (Grid Mode Only) */}
            {viewMode === 'grid' && (
                <div className="relative">
                    <button 
                        onClick={() => setShowCustomizeMenu(!showCustomizeMenu)}
                        className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm transition-colors ${showCustomizeMenu ? 'bg-gray-100 border-gray-300 text-gray-900' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Settings2 size={16} />
                        <span className="hidden sm:inline">Hiển thị</span>
                    </button>

                    {showCustomizeMenu && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 shadow-lg rounded-lg z-20 p-2 animate-fade-in">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 mb-1">Thông tin thẻ</div>
                            <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={gridConfig.showSize}
                                    onChange={(e) => setGridConfig(prev => ({...prev, showSize: e.target.checked}))}
                                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                                <span className="text-sm text-gray-700">Kích thước file</span>
                            </label>
                            <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={gridConfig.showDate}
                                    onChange={(e) => setGridConfig(prev => ({...prev, showDate: e.target.checked}))}
                                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                                <span className="text-sm text-gray-700">Ngày tải lên</span>
                            </label>
                            <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={gridConfig.showTags}
                                    onChange={(e) => setGridConfig(prev => ({...prev, showTags: e.target.checked}))}
                                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                                <span className="text-sm text-gray-700">Thẻ (Tags)</span>
                            </label>
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center bg-gray-100 p-1 rounded-lg">
            <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <List size={18} />
            </button>
            <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <Grid size={18} />
            </button>
            </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'list' ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 font-medium text-gray-500">
                <tr>
                  <th className="px-6 py-4">Tên tài liệu</th>
                  <th className="px-6 py-4 hidden md:table-cell">Loại</th>
                  <th className="px-6 py-4 hidden sm:table-cell">Kích thước</th>
                  <th className="px-6 py-4">Ngày tải lên</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedDoc(doc)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-lg">{getIcon(doc.type)}</div>
                        <span className="font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{doc.type}</span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">{doc.size}</td>
                    <td className="px-6 py-4">{new Date(doc.uploadDate).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDocs.map((doc) => (
              <div 
                key={doc.id} 
                onClick={() => setSelectedDoc(doc)}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                      {getIcon(doc.type)}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 truncate" title={doc.name}>{doc.name}</h3>
                  
                  {/* Customized Meta Info */}
                  {(gridConfig.showSize || gridConfig.showDate) && (
                      <p className="text-xs text-gray-500 mt-1">
                          {gridConfig.showSize && <span>{doc.size}</span>}
                          {gridConfig.showSize && gridConfig.showDate && <span> • </span>}
                          {gridConfig.showDate && <span>{new Date(doc.uploadDate).toLocaleDateString('vi-VN')}</span>}
                      </p>
                  )}
                </div>
                
                {/* Customized Tags */}
                {gridConfig.showTags && (
                    <div className="mt-4 flex flex-wrap gap-1">
                        {doc.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{tag}</span>
                        ))}
                    </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">{getIcon(selectedDoc.type)}</div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedDoc.name}</h2>
                  <p className="text-xs text-gray-500">ID: {selectedDoc.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Tóm tắt bởi AI</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{selectedDoc.summary || 'Đang chờ xử lý...'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-100 rounded-xl">
                    <h4 className="text-xs font-medium text-gray-400 mb-1">Loại tệp</h4>
                    <p className="text-gray-800 font-medium">{selectedDoc.type}</p>
                </div>
                <div className="p-4 border border-gray-100 rounded-xl">
                    <h4 className="text-xs font-medium text-gray-400 mb-1">Kích thước</h4>
                    <p className="text-gray-800 font-medium">{selectedDoc.size}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <Button variant="secondary" onClick={() => setSelectedDoc(null)}>Đóng</Button>
              <Button onClick={() => window.location.hash = `#/chat?doc=${selectedDoc.id}`}>
                Chat với tài liệu này
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Documents;