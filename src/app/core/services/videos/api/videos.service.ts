import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@environments/environment.development';
import { VideosStateService } from '../state/videos-state.service';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(
    private authService: AuthService,
    private videosStateService: VideosStateService,
  ) {}

  //RECORDATORIO: MEJORAR UI - BUSCAR LIBRERIA UI OJALÁ CON TAILWIND!!
  async uploadVideo(file: File) {
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

    const { url, key } = await res.json();

    const upload = await fetch(url, {
      method: 'PUT',
      body: file,
    });

    // RECORDATORIO: AGREGAR UI MODAL
    if (!upload.ok) {
      throw new Error('Error subiendo archivo a S3');
    }

    this.videosStateService.addVideo({
      key,
      fileName: file.name,
      status: 'UPLOADED',
      createdAt: new Date(),
    });
  }

  async loadVideos() {
    const res = await fetch(`${environment.api}/videos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await this.authService.getToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error('Error cargando videos');
    }

    const { videos } = await res.json();
    // this.videosStateService.setVideos(videos);
    console.log(videos);
  }
}
