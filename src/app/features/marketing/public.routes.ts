import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@shared/layouts/public-layout/public-layout.component').then(
        (m) => m.PublicLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () => import('./landing/landing.component').then((m) => m.LandingComponent),
      },
      {
        path: 'pricing',
        loadComponent: () => import('./pricing/pricing.component').then((m) => m.PricingComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('./contact/contact.component').then((m) => m.ContactComponent),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./services/services.component').then((m) => m.ServicesComponent),
      },
    ],
  },
];
