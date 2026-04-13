import { Component } from '@angular/core';
import { AuthService } from '@core/auth/auth.services';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login();
  }

  checkAuth(): void {
    const res = this.authService.checkAuth().subscribe();
    console.log(res);
  }
}
