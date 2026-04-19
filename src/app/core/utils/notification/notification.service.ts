import { Injectable, signal } from '@angular/core';

type NoticeType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  message = signal('');
  type = signal<NoticeType>('info');
  visible = signal(false);

  private timeoutId?: ReturnType<typeof setTimeout>;

  show(type: NoticeType, message: string) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.type.set(type);
    this.message.set(message);
    this.visible.set(true);

    this.timeoutId = setTimeout(() => {
      this.visible.set(false);
    }, 3000);
  }

  success(msg: string) {
    this.show('success', msg);
  }

  error(msg: string) {
    this.show('error', msg);
  }

  info(msg: string) {
    this.show('info', msg);
  }

  warning(msg: string) {
    this.show('warning', msg);
  }
}
