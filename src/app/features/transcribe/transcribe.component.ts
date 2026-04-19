import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '@core/services/notification/notification.service';
import { TranscriptionService } from '@core/services/transcription/transcription.service';
import { VideoService } from '@core/services/videos/api/video.service';
import { VideoDetailInterface } from '@core/services/videos/interfaces/video-detail.interface';

type TranscribeStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

@Component({
  selector: 'app-transcribe',
  imports: [],
  templateUrl: './transcribe.component.html',
})
export class TranscribeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly videoService = inject(VideoService);
  private readonly notification = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly videoId = this.route.snapshot.paramMap.get('videoId') ?? '';

  error = signal<string | null>(null);
  isLoading = signal<boolean>(true);
  videoDetail = signal<VideoDetailInterface | null>(null);
  transcriptText = signal<string>('');

  private pollingId: ReturnType<typeof setInterval> | null = null;

  constructor(private transcriptionService: TranscriptionService) {
    this.loadVideoDetail();

    this.destroyRef.onDestroy(() => {
      this.stopPolling();
    });
  }

  get resolvedVideoUrl(): string | null {
    return this.videoDetail()?.videoUrl ?? null;
  }

  get currentTranscribeStatus(): TranscribeStatus {
    return (this.videoDetail()?.transcribeStatus as TranscribeStatus) ?? 'NOT_STARTED';
  }

  async loadCompletedTranscript(videoId: string) {
    try {
      const res = await this.transcriptionService.getStatus(videoId);
      console.log('getStatus completed:', res);

      if (res.transcribe_status === 'COMPLETED') {
        this.videoDetail.update((v) =>
          v
            ? {
                ...v,
                transcribeStatus: 'COMPLETED',
              }
            : v,
        );

        this.transcriptText.set(res.transcript_text ?? '');
      }
    } catch (error) {
      console.error('Error cargando transcripción completada', error);
    }
  }

  async loadVideoDetail(): Promise<void> {
    if (!this.videoId) {
      this.error.set('No se encontró videoId en la ruta');
      this.notification.error('No se encontró videoId en la ruta');
      this.isLoading.set(false);
      return;
    }

    try {
      const res = await this.videoService.getVideo(this.videoId);
      this.videoDetail.set(res);

      if (res.transcribeStatus === 'IN_PROGRESS') {
        this.startPolling(this.videoId);
      }

      if (res.transcribeStatus === 'COMPLETED') {
        await this.loadCompletedTranscript(this.videoId);
      }
    } catch (error) {
      console.error('Error obteniendo detalle del video', error);
      this.error.set('No se pudo cargar el video');
      this.notification.error('No se pudo cargar el video');
    } finally {
      this.isLoading.set(false);
    }
  }

  async transcriptionVideo() {
    const video = this.videoDetail();

    if (!video) return;
    if (video.transcribeStatus === 'IN_PROGRESS' || video.transcribeStatus === 'COMPLETED') {
      return;
    }

    this.videoDetail.update((v) =>
      v
        ? {
            ...v,
            transcribeStatus: 'IN_PROGRESS',
          }
        : v,
    );

    try {
      const result = await this.transcriptionService.transcribeVideo(video.videoId);

      console.log('Transcription started:', result);
      this.notification.success('Transcripción iniciada');

      this.startPolling(video.videoId);
    } catch (error) {
      console.error('Error al transcribir', error);

      this.videoDetail.update((v) =>
        v
          ? {
              ...v,
              transcribeStatus: 'FAILED',
            }
          : v,
      );

      this.notification.error('Error al transcribir el video');
    }
  }

  startPolling(videoId: string) {
    this.stopPolling();

    this.pollingId = setInterval(async () => {
      try {
        const res = await this.transcriptionService.getStatus(videoId);

        this.videoDetail.update((v) =>
          v
            ? {
                ...v,
                transcribeStatus: res.transcribe_status,
              }
            : v,
        );

        if (res.transcribe_status === 'COMPLETED') {
          this.stopPolling();
          await this.loadCompletedTranscript(videoId);
          this.notification.success('Transcripción completada');
        }

        if (res.transcribe_status === 'FAILED') {
          this.stopPolling();
          this.notification.error('Falló la transcripción');
        }
      } catch (error) {
        console.error('Error consultando estado de transcripción', error);
        this.stopPolling();
      }
    }, 4000);
  }

  stopPolling() {
    if (this.pollingId) {
      clearInterval(this.pollingId);
      this.pollingId = null;
    }
  }
  async copyTranscript() {
    const text = this.transcriptText();

    if (!text) {
      this.notification.error('No hay transcripción para copiar');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      this.notification.success('Transcripción copiada');
    } catch (error) {
      console.error('Error copiando transcripción', error);
      this.notification.error('No se pudo copiar la transcripción');
    }
  }
}
