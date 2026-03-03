import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';

interface UserInfo {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  login(userInfo: UserInfo): Observable<boolean> {
    if (
      userInfo.email === 'admin@gmail.com' &&
      userInfo.password === 'admin123'
    ) {
      this.setToken('rwemgomrgoemgFIfCMDEFIOfmMKVDSLMVmvcdlkvmDVFMDlKMVlvm');
      return of(true);
    }

    return throwError(() => new Error('Invalid email or password'));
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}