import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authConfig } from './core/auth/auth.config';
import { provideAuth, withAppInitializerAuthCheck } from 'angular-auth-oidc-client';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuth(authConfig, withAppInitializerAuthCheck()),
    provideHttpClient(withFetch()),
  ],
};
