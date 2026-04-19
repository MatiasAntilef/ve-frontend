export type VideoStatus =
  | 'CREATED'
  | 'UPLOADING'
  | 'UPLOADED'
  | 'QUEUED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

export type ProcessStatus =
  | 'NOT_REQUESTED'
  | 'PENDING'
  | 'QUEUED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

export interface IVideo {
  id: string;
  userId: string;
  fileName: string;
  s3Key: string;
  status: VideoStatus;
  transcriptionRequested: boolean;
  dubbingRequested: boolean;
  transcriptionStatus: ProcessStatus;
  dubbingStatus: ProcessStatus;
  transcriptUrl?: string;
  dubbedAudioUrl?: string;
  createdAt: string;
  updatedAt: string;
  errorMessage?: string;
}
