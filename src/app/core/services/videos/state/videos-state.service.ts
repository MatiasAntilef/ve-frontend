import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class VideosStateService {
  private videosSubject = new BehaviorSubject<any[]>([]);
  videos$ = this.videosSubject.asObservable();

  setVideos(videos: any[]) {
    this.videosSubject.next(videos);
  }

  addVideo(video: any) {
    this.videosSubject.next([video, this.videosSubject.value]);
  }
}
