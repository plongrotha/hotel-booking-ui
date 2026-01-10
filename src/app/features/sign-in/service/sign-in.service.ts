import { inject, Injectable } from '@angular/core';
import { AuthResponse, SigninRequest } from '../../../core/model/auth.model';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private API_URL = 'http://localhost:8080/api/auth/login';
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

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
