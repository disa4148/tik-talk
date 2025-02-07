import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from './auth.interfaces';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);

  http = inject(HttpClient);

  baseUrl: string = 'https://icherniakov.ru/yt-course/auth/';

  accessToken: string | null = null;
  refreshToken: string | null = null;

  cookieService = inject(CookieService);

  get isAuth() {
    if (!this.accessToken)
      this.accessToken = this.cookieService.get('access_token');
    this.refreshToken = this.cookieService.get('refresh_token');

    return !!this.accessToken;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http
      .post<AuthResponse>(`${this.baseUrl}token`, fd)
      .pipe(tap((val) => this.saveTokens(val)));
  }

  refreshAuthToken() {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}refresh`, {
        refreshToken: this.refreshToken,
      })
      .pipe(
        tap((val) => this.saveTokens(val)),
        catchError((error) => {
          this.logout();
          return throwError(error);
        })
      );
  }

  saveTokens(res: AuthResponse) {
    this.accessToken = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set('access_token', this.accessToken);
    this.cookieService.set('refresh_token', this.refreshToken);
  }

  logout() {
    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }
}
