import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
// import { AuthService } from '@core/services/auth/api/auth.service';

@Component({
  selector: 'app-private-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './private-layout.component.html',
})
export class PrivateLayoutComponent {
  // constructor(private authService: AuthService) {
  // logoff() {
  //   this.authService.logoff();
  // }
}
