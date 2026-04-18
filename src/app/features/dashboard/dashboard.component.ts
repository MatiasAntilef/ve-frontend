import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification/notification.service';
import { VideoService } from '@core/services/videos/api/video.service';
import { ResVideoListInterface } from '@core/services/videos/interfaces/video.interface';
import { formatDate } from '@core/utils/format-date.util';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(
    private videoService: VideoService,
    private router: Router,
  ) {
    this.load();
  }
  private notification = inject(NotificationService);

  readonly formatD = formatDate;
  showConfirmUpload = signal(false);
  selectedFile: File | null = null;
  isUploading = false;

  videos = signal<ResVideoListInterface>({ videos: [] });
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  async load() {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const videos = await this.videoService.loadVideos();
      this.videos.set(videos);
    } catch (err) {
      this.error.set('No se pudieron cargar los videos');
      this.notification.error('Error cargando videos');
    } finally {
      this.isLoading.set(false);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (!file) return;

    if (file.type !== 'video/mp4') {
      this.selectedFile = null;
      this.notification.warning('Solo se permiten archivos MP4');
      input.value = '';
      return;
    }

    this.selectedFile = file;
    this.showConfirmUpload.set(true);
  }

  async uploadSelectedFile(input?: HTMLInputElement) {
    if (!this.selectedFile || this.isUploading) {
      return;
    }

    this.isUploading = true;

    try {
      await this.videoService.uploadVideo(this.selectedFile);
      this.notification.success('Video subido correctamente');
      this.selectedFile = null;
      await this.load();
    } catch (error) {
      console.error(error);
      this.notification.error('Error subiendo video');
    } finally {
      this.isUploading = false;

      if (input) {
        input.value = '';
      }
    }
  }

  async confirmUpload(input: HTMLInputElement) {
    if (!this.selectedFile || this.isUploading) {
      return;
    }

    this.showConfirmUpload.set(false);
    this.isUploading = true;

    try {
      await this.videoService.uploadVideo(this.selectedFile);
      this.notification.success('Video subido correctamente');
      this.selectedFile = null;
      input.value = '';
      await this.load();
    } catch (error) {
      console.error(error);
      this.notification.error('Error subiendo video');
      input.value = '';
    } finally {
      this.isUploading = false;
    }
  }

  cancelUpload(input: HTMLInputElement) {
    this.showConfirmUpload.set(false);
    this.selectedFile = null;
    input.value = '';
  }

  openVideo(videoId: string) {
    void this.router.navigate(['/transcribe', videoId]);
  }
}
