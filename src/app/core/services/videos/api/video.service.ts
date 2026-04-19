import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ICreateVideoOptions, IResCreateVideo } from '../models/create-video.model';
import { IResListVideos } from '../models/get-videos.model';
import { IResVideoDetail } from '../models/get-video-by-id.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor() {}
  private http = inject(HttpClient);

  createVideo(file: File, options: ICreateVideoOptions): Promise<IResCreateVideo> {
    return firstValueFrom(
      this.http.post<IResCreateVideo>('/videos', {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        transcriptionRequested: options.transcription,
        dubbingRequested: options.dubbing,
      }),
    );
  }

  getVideos(nextToken?: string): Promise<IResListVideos> {
    return firstValueFrom(
      this.http.get<IResListVideos>('/videos', {
        params: nextToken ? { nextToken } : {},
      }),
    );
  }

  getVideoById(videoId: string): Promise<IResVideoDetail> {
    return firstValueFrom(this.http.get<IResVideoDetail>(`/videos/${videoId}`));
  }
}
