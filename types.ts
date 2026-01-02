
export enum AppPages {
  HOME = 'home',
  TEXT_TO_VIDEO = 'text-to-video',
  HORROR_SHORTS = 'horror-shorts',
  WATERMARK_REMOVER = 'watermark-remover',
  ENHANCE_QUALITY = 'enhance-quality',
  PRICING = 'pricing',
  DASHBOARD = 'dashboard'
}

export interface VideoProject {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'processing' | 'completed';
  thumbnail?: string;
  videoUrl?: string;
  createdAt: number;
}

export enum VideoType {
  STORY = 'story',
  EDUCATIONAL = 'educational',
  ADVERTISING = 'advertising',
  HORROR = 'horror',
  MOTIVATIONAL = 'motivational'
}

export enum AspectRatio {
  PORTRAIT = '9:16',
  LANDSCAPE = '16:9',
  SQUARE = '1:1'
}
