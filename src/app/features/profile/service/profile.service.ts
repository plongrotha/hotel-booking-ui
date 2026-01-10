import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserResponse, UserUpdate } from '../../../core/model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private API_URL = 'http://localhost:8080/api/v1/users';

  private http = inject(HttpClient);

  constructor() {
    this.getUserProfile();
  }

  getUserProfile(): Observable<{ data: UserResponse }> {
    return this.http.get<{ data: UserResponse }>(this.API_URL + '/profile');
  }

  updateUserProfile(userData: Partial<UserUpdate>): Observable<void> {
    return this.http.put<void>(this.API_URL, userData);
  }
}
