export interface VideoDetailInterface {
  videoId: string;
  videoName: string;
  duration: number | null;
  transcribeStatus: boolean;
  transcriptKey: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
}
