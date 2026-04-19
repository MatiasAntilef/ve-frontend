import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastGlobalComponent } from '@shared/components/notification-global/toast-global.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastGlobalComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
    this.oidcSecurityService.checkAuth();
  }
  protected readonly title = signal('video-editor-frontend');
  private readonly oidcSecurityService = inject(OidcSecurityService);
}
