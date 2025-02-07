import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing: boolean = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.accessToken;

  if (!accessToken) return next(req);

  if (isRefreshing) return updateToken(authService, req, next);

  return next(addToken(req, accessToken)).pipe(
    catchError((error) => {
      if (error.status === 403) {
        return updateToken(authService, req, next);
      }
      return throwError(error);
    })
  );
};

const updateToken = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (!isRefreshing) {
    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        isRefreshing = false;
        return next(addToken(req, res.access_token));
      })
    );
  }
  return next(addToken(req, authService.accessToken!));
};

const addToken = (req: HttpRequest<any>, accessToken: string) => {
  return (req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  }));
};
