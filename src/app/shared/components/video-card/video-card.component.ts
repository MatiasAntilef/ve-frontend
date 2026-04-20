import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-video-card',
  imports: [RouterLink],
  templateUrl: './video-card.component.html',
})
export class VideoCardComponent {
  constructor() {}

  id = input<string>('');
  fileName = input<string>('');
  screenshot = input<string>('');
}
