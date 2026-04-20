import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IResListVideos } from '../models/get-videos.model';
import { IResVideoDetail } from '../models/get-video-by-id.model';
import { IPostVideoOptions, IResPostVideo } from '../models/post-video.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor() {}
  private http = inject(HttpClient);

  postVideo(file: File, options: IPostVideoOptions): Promise<IResPostVideo> {
    return firstValueFrom(
      this.http.post<IResPostVideo>('/videos', {
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
      this.http.get<IResListVideos>('/default.json', {
        params: nextToken ? { nextToken } : {},
      }),
    );
  }

  getVideoById(videoId: string): Promise<IResVideoDetail> {
    return firstValueFrom(this.http.get<IResVideoDetail>(`/videos/${videoId}`));
  }
}
