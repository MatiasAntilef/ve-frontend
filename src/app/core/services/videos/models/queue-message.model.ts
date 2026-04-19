export type ProcessingType = 'TRANSCRIPTION' | 'DUBBING';

export interface IQueueMessage {
  jobId: string;
  processType: ProcessingType;
  requestedAt: string;
  attempt: number;
}
