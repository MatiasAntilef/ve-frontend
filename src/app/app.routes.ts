import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
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
    loadComponent: () =>
      import('./shared/layouts/private-layout/private-layout.component').then(
        (m) => m.PrivateLayoutComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./features/edit/edit.component').then((m) => m.EditComponent),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./features/account/account.component').then((m) => m.AccountComponent),
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
