import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BookingRequest {
  userId: number;
  hotelId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface BookingRequestByUsername {
  username: string;
  hotelId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface BookingResponse {
  bookingId: number;
  userId: number;
  hotelId: number;
  roomId: number;
  totalPrice: number;
  bookingAt: string;
  updatedAt: string;
  checkInDate: string;
  checkOutDate: string;
}
@Injectable({
  providedIn: 'root',
})
export class BookingServiceService {
  private API_URL = 'http://localhost:8080/api/v1/bookings';

  private http = inject(HttpClient);

  constructor() {}

  createBooking(request: BookingRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}`, request);
  }

  getAllBookingsOfCurrentUser(
    userId: number
  ): Observable<{ data: BookingResponse[] }> {
    return this.http.get<{ data: BookingResponse[] }>(
      `${this.API_URL}/user/${userId}`
    );
  }

  cancelBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${bookingId}`);
  }
}
