import { inject, Injectable } from '@angular/core';
import { AuthResponse, SigninRequest } from '../../../core/model/auth.model';
import { Observable, tap, of, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private API_URL = 'http://172.16.12.164:8080/api/auth/login';
  private LOGOUT_API_URL = 'http://172.16.12.164:8080/api/auth/logout';
  private VERIFY_API_URL = 'http://172.16.12.164:8080/api/auth/verify-token';
  private REFRESH_API_URL = 'http://172.16.12.164:8080/api/auth/refresh';
  private ACCESS_TOKEN_KEY = 'accessToken';
  private REFRESH_TOKEN_KEY = 'refreshToken';

  private http = inject(HttpClient);

  constructor() {}

  signIn(signInRequest: SigninRequest): Observable<any> {
    return this.http.post<any>(this.API_URL, signInRequest).pipe(
      tap((response: any) => {
        console.log('Full Response in service:', response);
        // Access tokens from the data property
        const accessToken = response.data?.accessToken;
        const refreshToken = response.data?.refreshToken;

        if (accessToken && refreshToken) {
          this.saveTokens(accessToken, refreshToken);
          console.log('Tokens saved successfully');
        } else {
          console.error('Tokens are missing in response');
        }
      })
    );
  }

  private saveTokens(accessToken: string, refreshToken: string): void {
    console.log('Saving tokens to localStorage...');
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    console.log(
      'Saved access token:',
      localStorage.getItem(this.ACCESS_TOKEN_KEY)
    );
    console.log(
      'Saved refresh token:',
      localStorage.getItem(this.REFRESH_TOKEN_KEY)
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  removeTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  logout(): Observable<any> {
    const token = this.getAccessToken();
    if (!token) {
      console.warn('No access token found for logout');
      // Still remove tokens locally if they exist
      this.removeTokens();
      return of({ success: true, message: 'Already logged out' });
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return this.http.post<any>(this.LOGOUT_API_URL, null, { headers }).pipe(
      tap((response: any) => {
        console.log('Logout response:', response);
        // Remove tokens from localStorage after successful API call
        this.removeTokens();
        console.log('Tokens removed successfully after logout');
      }),
      catchError((error) => {
        console.error('Logout API call failed:', error);
        // Still remove tokens locally even if API call fails
        this.removeTokens();
        console.log('Tokens removed locally despite API failure');
        // Return success to avoid breaking the UI flow
        return of({ success: true, message: 'Logged out locally' });
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return of({ success: false, message: 'No refresh token found' });
    }
    return this.http.post<any>(this.REFRESH_API_URL, { refreshToken }).pipe(
      tap((response: any) => {
        const accessToken = response.data?.accessToken;
        const newRefreshToken = response.data?.refreshToken;
        if (accessToken && newRefreshToken) {
          this.saveTokens(accessToken, newRefreshToken);
          console.log('Tokens refreshed and saved');
        } else {
          console.error('Failed to refresh tokens');
        }
      }),
      catchError((error) => {
        console.error('Refresh token API call failed:', error);
        return of({ success: false, message: 'Token refresh failed' });
      })
    );
  }

  verifyToken(): Observable<any> {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return of({ valid: false, message: 'No access token found' });
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    return this.http.get<any>(this.VERIFY_API_URL, { headers }).pipe(
      catchError((error) => {
        console.error('Verify token API call failed:', error);
        return of({ valid: false, message: 'Token verification failed' });
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
