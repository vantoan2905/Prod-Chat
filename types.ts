export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export enum DocType {
  PDF = 'PDF',
  DOCX = 'DOCX',
  TXT = 'TXT',
  EXCEL = 'XLSX',
  IMAGE = 'IMG'
}

export enum ProcessStatus {
  PROCESSING = 'Đang xử lý',
  COMPLETED = 'Hoàn tất',
  FAILED = 'Lỗi'
}

export interface Document {
  id: string;
  name: string;
  type: DocType;
  size: string;
  uploadDate: string; // ISO date string
  status: ProcessStatus;
  tags: string[];
  summary?: string;
  content?: string; // Simulated content
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  relatedDocs?: string[]; // IDs of related documents
}

export type ViewMode = 'grid' | 'list';

export interface AIModelConfig {
  modelId: string;
  temperature: number;
  maxTokens?: number;
}