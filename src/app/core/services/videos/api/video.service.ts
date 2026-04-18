import { inject, Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@environments/environment.development';
import { VideoInterface } from '../interfaces/video.interface';
import { VideoStateService } from '../state/video-state.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoadVideosResponse } from '../interfaces/res-video.interface';

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

  async loadVideos(): Promise<VideoInterface[]> {
    const res = await firstValueFrom(
      this.http.get<LoadVideosResponse>(`${environment.api}/videos`),
    );
    return res.videos;
  }

  async getVideo(videoId: string) {
    return firstValueFrom(this.http.get(`${environment.api}/videos/${videoId}`));
  }
}
