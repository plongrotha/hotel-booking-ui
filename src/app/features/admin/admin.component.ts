import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, Booking, DashboardStats } from './service/admin.service';
import { UserResponse } from '../../core/model/user.model';
import { Hotel } from '../../core/model/hotel.model';
import { SignupRequest } from '../../core/model/auth.model';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, StatCardComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  activeTab: 'dashboard' | 'users' | 'hotels' | 'bookings' = 'dashboard';

  // Dashboard Data
  stats: DashboardStats = {
    totalUsers: 0,
    totalHotels: 0,
    totalBookings: 0,
    totalRevenue: 0,
  };

  // Users Data
  users: UserResponse[] = [];
  filteredUsers: UserResponse[] = [];
  userSearchTerm: string = '';

  // Hotels Data
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  hotelSearchTerm: string = '';

  // Bookings Data
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  bookingSearchTerm: string = '';

  loading: boolean = false;
  error: string = '';

  // Create User Dialog
  isCreateUserDialogOpen: boolean = false;
  isCreatingUser: boolean = false;
  createUserError: string = '';
  createUserSuccess: boolean = false;

  newUserData: SignupRequest = {
    username: '',
    password: '',
    role: '',
  };

  constructor(private adminService: AdminService) {
    this.loadHotels();
    this.loadUsers();
  }

  ngOnInit(): void {}

  setActiveTab(tab: 'dashboard' | 'users' | 'hotels' | 'bookings'): void {
    this.activeTab = tab;
    this.error = '';

    switch (tab) {
      case 'dashboard':
        // this.loadDashboardStats();
        break;
      case 'users':
        this.loadUsers();
        break;
      case 'hotels':
        this.loadHotels();
        break;
      case 'bookings':
        this.loadBookings();
        break;
    }
  }

  // User Management Methods
  loadUsers(): void {
    this.loading = true;
    this.adminService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.data;
        this.stats.totalUsers = this.users.length;
        this.filteredUsers = data.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error(err);
      },
    });
  }

  searchUsers(): void {
    const term = this.userSearchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredUsers = [...this.users];
      return;
    }
    this.filteredUsers = this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(term) ||
        user.firstName?.toLowerCase().includes(term) ||
        user.lastName?.toLowerCase().includes(term) ||
        user.role?.toLowerCase().includes(term) ||
        user.age?.toString().includes(term)
    );
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id !== userId);
          this.searchUsers();
        },
        error: (err) => {
          this.error = 'Failed to delete user';
          console.error(err);
        },
      });
    }
  }

  toggleUserStatus(user: UserResponse): void {
    this.adminService.toggleUserStatus(user.id).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.searchUsers();
        }
      },
      error: (err) => {
        this.error = 'Failed to toggle user status';
        console.error(err);
      },
    });
  }

  openCreateUserDialog(): void {
    console.log('openCreateUserDialog called');
    this.isCreateUserDialogOpen = true;
    console.log('isCreateUserDialogOpen:', this.isCreateUserDialogOpen);
    this.createUserError = '';
    this.createUserSuccess = false;
    this.newUserData = {
      username: '',
      password: '',
      role: '',
    };
  }

  closeCreateUserDialog(): void {
    this.isCreateUserDialogOpen = false;
    this.createUserError = '';
    this.createUserSuccess = false;
  }

  registerNewUser(): void {
    this.isCreatingUser = true;
    this.adminService.registerNewUser(this.newUserData).subscribe({
      next: () => {
        this.isCreatingUser = false;
        this.createUserSuccess = true;
        this.loadUsers();
        this.newUserData = {
          username: '',
          password: '',
          role: '',
        };
        // setTimeout(() => {
        //   this.closeCreateUserDialog();
        // }, 1500);
      },
      error: (err) => {
        this.isCreatingUser = false;
        this.createUserError = 'Failed to create user';
        console.error(err);
      },
    });
  }

  // Hotel Management Methods
  loadHotels(): void {
    this.loading = true;
    this.adminService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data.data;
        this.stats.totalHotels = this.hotels.length;
        this.filteredHotels = data.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load hotels';
        this.loading = false;
        console.error(err);
      },
    });
  }

  searchHotels(): void {
    const term = this.hotelSearchTerm.toLowerCase();
    this.filteredHotels = this.hotels.filter(
      (hotel) =>
        hotel.hotelName.toLowerCase().includes(term) ||
        hotel.location.toLowerCase().includes(term) ||
        hotel.ownerId.toString().includes(term)
    );
  }

  deleteHotel(hotelId: number): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.adminService.deleteHotel(hotelId).subscribe({
        next: () => {
          this.hotels = this.hotels.filter((h) => h.hotelId !== hotelId);
          this.searchHotels();
        },
        error: (err) => {
          this.error = 'Failed to delete hotel';
          console.error(err);
        },
      });
    }
  }

  // Booking Management Methods
  loadBookings(): void {
    this.loading = true;
    this.adminService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data.data;
        this.filteredBookings = data.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load bookings';
        this.loading = false;
        console.error(err);
      },
    });
  }

  searchBookings(): void {
    const term = this.bookingSearchTerm.toLowerCase();
    this.filteredBookings = this.bookings.filter(
      (booking) =>
        booking.hotelName?.toLowerCase().includes(term) ||
        booking.userName?.toLowerCase().includes(term) ||
        booking.status.toLowerCase().includes(term)
    );
  }

  updateBookingStatus(bookingId: number, status: string): void {
    this.adminService.updateBookingStatus(bookingId, status).subscribe({
      next: (updatedBooking) => {
        const index = this.bookings.findIndex((b) => b.bookingId === bookingId);
        if (index !== -1) {
          this.bookings[index] = updatedBooking;
          this.searchBookings();
        }
      },
      error: (err) => {
        this.error = 'Failed to update booking status';
        console.error(err);
      },
    });
  }

  deleteBooking(bookingId: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.adminService.deleteBooking(bookingId).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(
            (b) => b.bookingId !== bookingId
          );
          this.searchBookings();
        },
        error: (err) => {
          this.error = 'Failed to delete booking';
          console.error(err);
        },
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'active':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  }
}
