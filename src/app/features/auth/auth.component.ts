import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth/api/auth.service';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login();
  }
}
