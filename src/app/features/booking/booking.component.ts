import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../profile/service/profile.service';
import {
  BookingResponse,
  BookingServiceService,
} from '../../core/services/booking-service.service';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, RouterLink],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  private profileService = inject(ProfileService);
  private bookingService = inject(BookingServiceService);
  bookings: BookingResponse[] = [];
  isLoading = false;

  constructor() {
    this.getAllBookings();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  getAllBookings(): void {
    this.isLoading = true;
    this.profileService.getUserProfile().subscribe({
      next: (response) => {
        const userId = response.data.id;
        this.bookingService.getAllBookingsOfCurrentUser(userId).subscribe({
          next: (response) => {
            this.bookings = response.data || [];
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching bookings:', error);
            this.isLoading = false;
          },
        });
      },
      error: (error) => {
        console.error('Error getting user profile:', error);
        this.isLoading = false;
      },
    });
  }

  cancelBooking(bookingId: number): void {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(
          (booking) => booking.bookingId !== bookingId
        );
      },
      error: (error) => {
        console.error('Error cancelling booking:', error);
      },
    });
  }
}
