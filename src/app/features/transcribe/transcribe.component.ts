import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '@core/services/videos/api/video.service';

interface VideoDetail {
  video_id?: string;
  video_name?: string;
  status?: string;
  transcribe_status?: boolean;
  created_at?: string;
  duration?: number | null;
  videoUrl?: string;
  video_url?: string;
  [key: string]: unknown;
}

@Component({
  selector: 'app-transcribe',
  imports: [],
  templateUrl: './transcribe.component.html',
  styleUrl: './transcribe.component.css',
})
export class TranscribeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly videoService = inject(VideoService);

  readonly videoId = this.route.snapshot.paramMap.get('videoId') ?? '';

  isLoading = true;
  errorMessage = '';
  videoData: VideoDetail | null = null;

  get resolvedVideoUrl(): string | null {
    if (!this.videoData) {
      return null;
    }

    return this.videoData.videoUrl ?? this.videoData.video_url ?? null;
  }

  async ngOnInit(): Promise<void> {
    if (!this.videoId) {
      this.errorMessage = 'No se encontro videoId en la ruta';
      this.isLoading = false;
      return;
    }

    try {
      this.videoData = (await this.videoService.getVideo(this.videoId)) as VideoDetail;
    } catch (error) {
      console.error('Error obteniendo detalle del video', error);
      this.errorMessage = 'No se pudo cargar el video';
    } finally {
      this.isLoading = false;
    }
  }

  formatDate(value: string | undefined): string {
    if (!value) {
      return '-';
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
  }
}
