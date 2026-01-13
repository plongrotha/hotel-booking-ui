import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Hotel,
  Room,
  RoomRequest,
  RoomUpdateRequest,
} from '../../../core/model/hotel.model';

export interface Booking {
  bookingId: number;
  userId: number;
  clientName: string;
  hotelId: number;
  roomId: number;
  totalPrice: number;
  bookingAt: string;
  updatedAt: string;
  checkInDate: string;
  checkOutDate: string;
  hotelName?: string;
  userName?: string;
  createdAt?: string;
}

export interface OwnerStats {
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
  activeBookings: number;
}

export interface CreateHotelRequest {
  hotelName: string;
  location: string;
  hotelImage?: string;
  googleMapUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private apiUrl = 'http://localhost:8080/api/v1/owners';

  constructor(private http: HttpClient) {}

  // Hotel Management
  getMyHotels(): Observable<{ data: Hotel[] }> {
    return this.http.get<{ data: Hotel[] }>(`${this.apiUrl}/hotels`);
  }

  createHotel(hotelData: CreateHotelRequest): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.apiUrl}`, hotelData);
  }

  addRoomToHotel(hotelId: number, roomData: RoomRequest): Observable<Room> {
    return this.http.post<Room>(
      `${this.apiUrl}/hotel/${hotelId}/rooms`,
      roomData
    );
  }

  getAllRoomByHotelId(hotelId: number): Observable<{ data: Room[] }> {
    return this.http.get<{ data: Room[] }>(`${this.apiUrl}/${hotelId}/rooms`);
  }

  updateHotel(
    hotelId: number,
    hotelData: Partial<CreateHotelRequest>
  ): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.apiUrl}/${hotelId}`, hotelData);
  }

  updateRoom(
    roomId: number,
    roomData: Partial<RoomUpdateRequest>
  ): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/rooms/${roomId}`, roomData);
  }

  deleteHotel(hotelId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${hotelId}`);
  }

  // Booking Management
  getMyHotelBookings(): Observable<{ data: Booking[] }> {
    return this.http.get<{ data: Booking[] }>(`${this.apiUrl}/bookings`);
  }

  updateBookingStatus(bookingId: number, status: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/bookings/${bookingId}/status`,
      { status }
    );
  }
}
