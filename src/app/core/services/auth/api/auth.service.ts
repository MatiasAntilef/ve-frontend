import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  private readonly authState = signal({
    isAuthenticated: false,
    userData: null as unknown,
    accessToken: '',
  });

  readonly isAuthenticated = computed(() => this.authState().isAuthenticated);
  readonly userData = computed(() => this.authState().userData);
  readonly accessToken = computed(() => this.authState().accessToken);

  async getToken(): Promise<string> {
    return firstValueFrom(this.oidcSecurityService.getAccessToken());
  }

  initAuth(): Observable<LoginResponse> {
    return this.oidcSecurityService.checkAuth().pipe(
      tap(({ isAuthenticated, userData, accessToken }) => {
        this.authState.set({
          isAuthenticated,
          userData,
          accessToken,
        });
      }),
    );
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logoff(): Observable<unknown> {
    return this.oidcSecurityService.logoff().pipe(
      tap(() => {
        this.authState.set({
          isAuthenticated: false,
          userData: null,
          accessToken: '',
        });
      }),
    );
  }

  refreshSession(): Observable<unknown> {
    return this.oidcSecurityService.forceRefreshSession();
  }

  checkAuth(): Observable<LoginResponse> {
    return this.oidcSecurityService.checkAuth().pipe(
      tap(({ isAuthenticated, userData, accessToken }) => {
        this.authState.set({
          isAuthenticated,
          userData,
          accessToken,
        });
      }),
    );
  }

  clearAuthState(): void {
    this.authState.set({
      isAuthenticated: false,
      userData: null,
      accessToken: '',
    });
  }
}
