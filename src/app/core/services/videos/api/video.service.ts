import { inject, Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@environments/environment.development';
import { VideoStateService } from '../state/video-state.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { VideoDetailInterface } from '../interfaces/video-detail.interface';
import { ResVideoListInterface } from '../interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(
    private authService: AuthService,
    private videoStateService: VideoStateService,
  ) {}
  private http = inject(HttpClient);

  async uploadVideo(file: File) {
    try {
      const res = await fetch(`${environment.api}/upload-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await this.authService.getToken()}`,
        },
        body: JSON.stringify({
          fileName: file.name,
        }),
      });

      if (!res.ok) {
        throw new Error('Error obteniendo URL de subida');
      }

      const { s3url, key } = await res.json();

      const upload = await fetch(s3url, {
        method: 'PUT',
        body: file,
      });

      if (!upload.ok) {
        throw new Error('Error subiendo archivo a S3');
      }

      this.videoStateService.addVideo({
        key,
        fileName: file.name,
        status: 'UPLOADED',
        createdAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  }

  async loadVideos(): Promise<ResVideoListInterface> {
    // return await firstValueFrom(this.http.get<ResVideoListInterface>('/default.json'));
    return await firstValueFrom(this.http.get<ResVideoListInterface>(`${environment.api}/videos`));
  }

  async getVideo(videoId: string): Promise<VideoDetailInterface> {
    return await firstValueFrom(
      this.http.get<VideoDetailInterface>(`${environment.api}/videos/${videoId}`),
    );
  }
}
