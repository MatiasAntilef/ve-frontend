import { Component } from '@angular/core';

@Component({
  selector: 'app-transcribe',
  imports: [],
  templateUrl: './transcribe.component.html',
})
export class TranscribeComponent {
  // constructor() {
  //   this.loadVideoDetail();
  // }
  // private readonly route = inject(ActivatedRoute);
  // private readonly videoService = inject(VideoService);
  // private notification = inject(NotificationService);
  // readonly videoId = this.route.snapshot.paramMap.get('videoId') ?? '';
  // error = signal<string | null>(null);
  // isLoading = signal<boolean>(true);
  // videoDetail = signal<VideoDetailInterface | null>(null);
  // isTranscribing = signal<boolean>(false);
  // get resolvedVideoUrl(): string | null {
  //   if (!this.videoDetail()) {
  //     return null;
  //   }
  //   return this.videoDetail()!.videoUrl ?? this.videoDetail()!.videoUrl ?? null;
  // }
  // async loadVideoDetail(): Promise<void> {
  //   if (!this.videoId) {
  //     this.error.set('No se encontro videoId en la ruta');
  //     this.notification.error('No se encontro videoId en la ruta');
  //     this.isLoading.set(false);
  //     return;
  //   }
  //   try {
  //     const res = await this.videoService.getVideoById(this.videoId);
  //     this.videoDetail.set(res);
  //   } catch (error) {
  //     console.error('Error obteniendo detalle del video', error);
  //     this.error.set('No se pudo cargar el video');
  //     this.notification.error('No se pudo cargar el video');
  //   } finally {
  //     this.isLoading.set(false);
  //   }
  // }
  // onTranscribe() {
  //   if (!this.videoDetail() || this.isTranscribing()) return;
  //   this.isTranscribing.set(true);
  //   // Simulación (reemplaza con tu servicio real)
  //   this.videoService.transcribeVideo(this.videoDetail()!.videoId).subscribe({
  //     next: () => {
  //       // actualizar estado local
  //       this.videoDetail.update((v) => ({
  //         ...v!,
  //         transcribeStatus: true,
  //       }));
  //     },
  //     error: () => {
  //       // podrías usar tu notification.service aquí
  //       console.error('Error al transcribir');
  //     },
  //     complete: () => {
  //       this.isTranscribing.set(false);
  //     },
  //   });
  // }
}
