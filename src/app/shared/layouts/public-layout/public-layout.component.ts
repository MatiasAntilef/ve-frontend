import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {
  constructor(private authService: AuthService) {}
  readonly isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  cognito(): void {
    this.authService.login();
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
