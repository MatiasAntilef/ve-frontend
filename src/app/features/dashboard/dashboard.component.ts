import { Component, signal } from '@angular/core';
import { VideoService } from '@core/services/videos/api/video.service';
import { VideoCardComponent } from '@shared/components/video-card/video-card.component';
import { IResListVideo } from '@core/services/videos/models/get-videos.model';

@Component({
  selector: 'app-dashboard',
  imports: [VideoCardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private videoService: VideoService) {
    this.getVideos();
  }

  $videos = signal<IResListVideo[]>([]);

  async getVideos() {
    const res = await this.videoService.getVideos();
    this.$videos.set(res.items);
    console.log(this.$videos());
  }
}
