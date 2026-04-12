import { Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  logout() {
    this.oidcSecurityService.logoff().subscribe();
  }
}
