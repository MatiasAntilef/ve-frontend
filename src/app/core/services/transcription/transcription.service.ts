import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '@environments/environment.development';

export interface StartTranscriptionResponse {
  message: string;
  video_id: string;
  job_name: string;
  status: 'IN_PROGRESS';
}
export interface TranscriptionStatusResponse {
  video_id: string;
  transcribe_status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  transcript_text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranscriptionService {
  constructor(private authService: AuthService) {}

  async transcribeVideo(videoId: string): Promise<StartTranscriptionResponse> {
    const token = await this.authService.getToken();

    const res = await fetch(`${environment.api}/transcription/${videoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data?.message || 'Error transcribing video');
    }

    return data;
  }

  async getStatus(videoId: string): Promise<TranscriptionStatusResponse> {
    const token = await this.authService.getToken();

    const res = await fetch(`${environment.api}/transcription/${videoId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data?.message || 'Error fetching transcription status');
    }

    return data;
  }

  async getTranscriptFromUrl(url: string): Promise<string> {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('No se pudo descargar el transcript');
    }

    const data = await res.json();

    return data?.results?.transcripts?.[0]?.transcript ?? '';
  }
}
