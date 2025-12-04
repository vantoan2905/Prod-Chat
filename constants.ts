import { DocType, Document, ProcessStatus } from './types';

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    name: 'Báo_cáo_tài_chính_Q4_2023.pdf',
    type: DocType.PDF,
    size: '2.4 MB',
    uploadDate: '2023-12-28T10:30:00Z',
    status: ProcessStatus.COMPLETED,
    tags: ['Tài chính', 'Q4', '2023'],
    summary: 'Báo cáo cho thấy doanh thu tăng trưởng 15% so với cùng kỳ năm ngoái. Chi phí vận hành giảm nhẹ nhờ tối ưu hóa quy trình.',
    content: 'Chi tiết về báo cáo tài chính...'
  },
  {
    id: '2',
    name: 'Ke_hoach_marketing_2024.docx',
    type: DocType.DOCX,
    size: '1.1 MB',
    uploadDate: '2024-01-05T09:15:00Z',
    status: ProcessStatus.COMPLETED,
    tags: ['Marketing', 'Kế hoạch', '2024'],
    summary: 'Chiến lược tập trung vào social media và influencer marketing. Ngân sách dự kiến tăng 20%.',
    content: 'Nội dung kế hoạch marketing...'
  },
  {
    id: '3',
    name: 'Danh_sach_nhan_su_du_an_A.xlsx',
    type: DocType.EXCEL,
    size: '450 KB',
    uploadDate: '2024-01-10T14:20:00Z',
    status: ProcessStatus.PROCESSING,
    tags: ['Nhân sự', 'Dự án A'],
    summary: 'Đang phân tích dữ liệu nhân sự...',
    content: 'Dữ liệu nhân sự...'
  },
  {
    id: '4',
    name: 'Ghi_chu_cuoc_hop_08_01.txt',
    type: DocType.TXT,
    size: '12 KB',
    uploadDate: '2024-01-08T16:00:00Z',
    status: ProcessStatus.COMPLETED,
    tags: ['Họp', 'Nội bộ'],
    summary: 'Thống nhất quy trình làm việc mới. Deadline cho dự án B là cuối tháng 2.',
    content: 'Biên bản cuộc họp...'
  },
  {
    id: '5',
    name: 'So_do_to_chuc.png',
    type: DocType.IMAGE,
    size: '3.2 MB',
    uploadDate: '2024-01-12T11:00:00Z',
    status: ProcessStatus.COMPLETED,
    tags: ['Sơ đồ', 'Công ty'],
    summary: 'Hình ảnh sơ đồ tổ chức công ty cập nhật mới nhất.',
    content: 'Mô tả hình ảnh...'
  }
];

export const AVAILABLE_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Nhanh)' },
  { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro (Thông minh)' },
];

export const SUGGESTED_QUERIES = [
  "Tóm tắt các tài liệu tải lên gần đây",
  "Tìm các điểm mâu thuẫn trong kế hoạch marketing",
  "Liệt kê các deadline quan trọng",
  "Phân tích xu hướng tài chính từ báo cáo"
];