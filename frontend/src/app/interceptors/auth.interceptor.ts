import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const stateService = inject(StateService);
  const router = inject(Router);

  const token = authService.getToken();
  const currentCompany = stateService.getCurrentCompany();

  let headers = req.headers;

  // Adicionar token JWT no header se existir
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  // Adicionar Tenant ID se existir
  if (currentCompany && currentCompany.id) {
    headers = headers.set('X-Tenant-ID', currentCompany.id);
  }

  req = req.clone({ headers });

  return next(req).pipe(
    catchError((error) => {
      // Redirecionar para login em caso de erro 401 ou 403
      if (error.status === 401 || error.status === 403) {
        authService.logout();
      }
      return throwError(() => error);
    }),
  );
};
