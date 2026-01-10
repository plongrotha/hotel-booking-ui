import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignupRequest } from '../../../core/model/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private API_URL = 'http://localhost:8080/api/auth/register';
  private http = inject(HttpClient);
  constructor() {}

  signUp(SignupRequest: SignupRequest): Observable<void> {
    return this.http.post<void>(this.API_URL, SignupRequest);
  }
}
