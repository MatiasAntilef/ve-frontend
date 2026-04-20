// // core/interceptors/auth.interceptor.ts
// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { from } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { AuthService } from '@core/services/auth/api/auth.service';
// import { SKIP_AUTH } from './skip-auth.token';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);

//   if (req.context.get(SKIP_AUTH)) {
//     return next(req);
//   }

//   return from(authService.getToken()).pipe(
//     switchMap((token) => {
//       if (!token) {
//         return next(req);
//       }

//       const cloned = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return next(cloned);
//     }),
//   );
// };
