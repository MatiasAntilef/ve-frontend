import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@shared/layouts/public-layout/public-layout.component').then(
        (m) => m.PublicLayoutComponent,
      ),
    children: [
      {
        path: 'landing',
        loadComponent: () =>
          import('./features/marketing/landing/landing.component').then((m) => m.LandingComponent),
      },
    ],
  },
  {
    path: 'app',
    canActivate: [autoLoginPartialRoutesGuard],
    loadComponent: () =>
      import('./shared/layouts/private-layout/private-layout.component').then(
        (m) => m.PrivateLayoutComponent,
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'editor',
        loadComponent: () =>
          import('./features/editor/editor.component').then((m) => m.EditorComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'transcribe/:videoId',
        loadComponent: () =>
          import('./features/transcribe/transcribe.component').then((m) => m.TranscribeComponent),
      },
    ],
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/auth/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent,
      ),
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./features/auth/forbidden/forbidden.component').then((m) => m.ForbiddenComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
