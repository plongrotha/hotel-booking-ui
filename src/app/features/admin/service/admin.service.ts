import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../core/model/user.model';
import { Hotel } from '../../../core/model/hotel.model';
import { SignupRequest } from '../../../core/model/auth.model';

export interface Booking {
  bookingId: number;
  userId: number;
  hotelId: number;
  hotelName?: string;
  userName?: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/v1/admin';

  constructor(private http: HttpClient) {}

  // User Management
  getAllUsers(): Observable<{ data: UserResponse[] }> {
    return this.http.get<{ data: UserResponse[] }>(`${this.apiUrl}`);
  }

  registerNewUser(userData: SignupRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, userData);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  toggleUserStatus(userId: number): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      `${this.apiUrl}/users/${userId}/toggle-status`,
      {}
    );
  }

  // Hotel Management
  getAllHotels(): Observable<{ data: Hotel[] }> {
    return this.http.get<{ data: Hotel[] }>(`${this.apiUrl}/hotels`);
  }

  deleteHotel(hotelId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/hotel/${hotelId}`);
  }

  // Booking Management
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  updateBookingStatus(bookingId: number, status: string): Observable<Booking> {
    return this.http.put<Booking>(
      `${this.apiUrl}/bookings/${bookingId}/status`,
      { status }
    );
  }

  deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bookings/${bookingId}`);
  }
}
