export interface VideoListInterface {
  user_id: string;
  video_name: string;
  created_at: string;
  thumbnail_key: string | null;
  transcribe_status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  transcription_job_name: string | null;
  status: string;
  transcript_key: string | null;
  video_key: string;
  duration: number | null;
  video_id: string;
}

export interface ResVideoListInterface {
  videos: VideoListInterface[];
}
