import { Component } from '@angular/core';
import { VideosService } from '@core/services/videos/api/videos.service';
import { VideosStateService } from '@core/services/videos/state/videos-state.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private videosService: VideosService) {}

  selectedFile!: File;

  async load() {
    const res = await this.videosService.loadVideos();
    console.log(res);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file && file.type === 'video/mp4') {
      this.selectedFile = file;
      this.videosService.uploadVideo(file);
    } else {
      console.error('Solo mp4');
    }
  }
}
