import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '@core/services/auth/api/auth.service';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './public-layout.component.html',
})
export class PublicLayoutComponent {
  constructor(private authService: AuthService) {}
  readonly isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  login(): void {
    this.authService.login();
  }
}
