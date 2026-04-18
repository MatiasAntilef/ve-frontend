// shared/components/toast-global.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'app-toast-global',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-global.component.html',
})
export class ToastGlobalComponent {
  readonly notification = inject(NotificationService);
}
