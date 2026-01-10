import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel, Room } from '../../../core/model/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private API_URL = 'http://localhost:8080/api/v1/hotels';
  private http = inject(HttpClient);

  constructor() {}

  getAllHotels(): Observable<{ data: Hotel[] }> {
    return this.http.get<{ data: Hotel[] }>(this.API_URL);
  }

  getAllHotelsPaginated(
    page: number,
    size: number
  ): Observable<{
    data: { content: Hotel[]; totalElements: number; totalPages: number };
  }> {
    return this.http.get<{
      data: { content: Hotel[]; totalElements: number; totalPages: number };
    }>(`${this.API_URL}/paged?page=${page}&size=${size}`);
  }

  getHotelById(id: number): Observable<{ data: Hotel }> {
    return this.http.get<{ data: Hotel }>(`${this.API_URL}/${id}`);
  }

  getRoomsByHotelId(hotelId: number): Observable<{ data: Room[] }> {
    return this.http.get<{ data: Room[] }>(`${this.API_URL}/${hotelId}/rooms`);
  }
}
