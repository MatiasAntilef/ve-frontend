export interface VideoDetailInterface {
  videoId: string;
  videoName: string;
  createdAt: string;
  duration: number | null;
  transcribeStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  transcriptKey: string | null;
  status: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
}
