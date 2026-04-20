import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { VideoService } from '@core/services/videos/api/video.service';
import { IPostVideoOptions } from '@core/services/videos/models/post-video.model';
import { NotificationService } from '@core/utils/notification/notification.service';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.component.html',
})
export class EditComponent {
  constructor(private videoService: VideoService) {}
  private notification = inject(NotificationService);

  @ViewChild('optionsModal') optionsModal?: ElementRef<HTMLDialogElement>;

  readonly selectedFile = signal<File | null>(null);
  readonly transcribe = signal(false);
  readonly dub = signal(false);

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (!file) return;

    if (file.type !== 'video/mp4' && !file.name.toLowerCase().endsWith('.mp4')) {
      input.value = '';
      this.notification.error('Por favor, selecciona un archivo MP4.');
      return;
    }

    this.selectedFile.set(file);
    this.optionsModal?.nativeElement.showModal();
  }

  closeModal(): void {
    this.optionsModal?.nativeElement.close();
  }

  confirmUpload(): void {
    const file = this.selectedFile();

    if (!file) {
      this.notification.error('No se ha seleccionado ningún archivo.');
      return;
    }
    // this.postVideo(file, { transcription: this.transcribe(), dubbing: this.dub() });

    console.log('Archivo:', file);
    console.log('Transcripción:', this.transcribe());
    console.log('Doblaje:', this.dub());
    this.closeModal();
  }

  postVideo(file: File, options: IPostVideoOptions) {
    this.videoService.postVideo(file, options).then((res) => {
      console.log(res);
    });
  }
}
