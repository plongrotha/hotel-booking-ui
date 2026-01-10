import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../service/hotel.service';
import { Hotel, Room } from '../../../core/model/hotel.model';
import {
  BookingServiceService,
  BookingRequest,
  BookingResponse,
} from '../../../core/services/booking-service.service';
import { ProfileService } from '../../profile/service/profile.service';

@Component({
  selector: 'app-hotel-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-detail.component.html',
  styleUrl: './hotel-detail.component.css',
})
export class HotelDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private hotelService = inject(HotelService);
  private bookingService = inject(BookingServiceService);
  private profileService = inject(ProfileService);

  hotel: Hotel | null = null;
  rooms: Room[] = [];
  isLoading = false;
  errorMessage = '';
  hotelId: number = 0;

  // Booking related
  bookings: BookingResponse[] = [];

  // Modal state
  isModalOpen = false;
  selectedRoom: Room | null = null;
  checkInDate: string = '';
  checkOutDate: string = '';
  minDate: string = '';
  isBooking = false;

  ngOnInit(): void {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.route.params.subscribe((params) => {
      this.hotelId = +params['id'];
      if (this.hotelId) {
        this.loadHotelDetails();
        this.loadRooms();
      }
    });
  }

  loadHotelDetails(): void {
    this.isLoading = true;
    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (response) => {
        this.hotel = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load hotel details';
        this.isLoading = false;
        console.error('Error loading hotel:', error);
      },
      complete: () => {
        console.log('Hotel details loaded');
      },
    });
  }

  loadRooms(): void {
    this.hotelService.getRoomsByHotelId(this.hotelId).subscribe({
      next: (response) => {
        this.rooms = response.data || [];
      },
      error: (error) => {
        this.errorMessage = 'Failed to load rooms';
        console.error('Error loading rooms:', error);
      },
    });
  }

  getImageUrl(fileName: string): string {
    if (!fileName) return '';
    return `http://localhost:8080/api/v1/images/${fileName}`;
  }

  getRoomTypeLabel(roomType: string): string {
    const labels: { [key: string]: string } = {
      DOUBLE_ROOM: 'Double Room',
      SINGLE_ROOM: 'Single Room',
      TRIPLE_ROOM: 'Triple Room',
    };
    return labels[roomType] || roomType;
  }

  goBack(): void {
    this.router.navigate(['/hotels']);
  }

  bookRoom(room: Room): void {
    this.selectedRoom = room;
    this.checkInDate = '';
    this.checkOutDate = '';
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedRoom = null;
    this.checkInDate = '';
    this.checkOutDate = '';
  }

  calculateNights(): number {
    if (!this.checkInDate || !this.checkOutDate) {
      return 0;
    }
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  confirmBooking(): void {
    if (!this.checkInDate || !this.checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }

    if (this.checkInDate >= this.checkOutDate) {
      alert('Check-out date must be after check-in date');
      return;
    }

    if (!this.selectedRoom) {
      alert('No room selected');
      return;
    }

    // Check if user is logged in
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('Please login to make a booking');
      this.router.navigate(['/sign-in']);
      return;
    }

    this.isBooking = true;

    // Get current user profile to get userId
    this.profileService.getUserProfile().subscribe({
      next: (response) => {
        const userId = response.data.id;

        if (!userId) {
          this.isBooking = false;
          alert('Unable to get user information. Please try again.');
          return;
        }

        // Create booking request
        const bookingRequest: BookingRequest = {
          userId: userId,
          hotelId: this.hotelId,
          roomId: this.selectedRoom!.roomId,
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
        };

        // Call booking service
        this.bookingService.createBooking(bookingRequest).subscribe({
          next: () => {
            this.isBooking = false;
            alert('Booking created successfully!');
            this.closeModal();
            // Reload rooms to update availability
            this.loadRooms();
          },
          error: (error) => {
            this.isBooking = false;
            console.error('Error creating booking:', error);
            const errorMsg =
              error.error?.message ||
              'Failed to create booking. Please try again.';
            alert(errorMsg);
          },
        });
      },
      error: (error) => {
        this.isBooking = false;
        console.error('Error getting user profile:', error);
        if (error.status === 401) {
          alert('Session expired. Please login again.');
          this.router.navigate(['/sign-in']);
        } else {
          alert('Unable to get user information. Please try again.');
        }
      },
    });
  }
}
