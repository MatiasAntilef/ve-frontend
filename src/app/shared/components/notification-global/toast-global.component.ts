import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '@core/utils/notification/notification.service';

@Component({
  selector: 'app-toast-global',
  imports: [CommonModule],
  templateUrl: './toast-global.component.html',
})
export class ToastGlobalComponent {
  readonly notification = inject(NotificationService);
}
