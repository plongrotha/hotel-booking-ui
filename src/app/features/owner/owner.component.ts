import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  OwnerService,
  Booking,
  OwnerStats,
  CreateHotelRequest,
} from './service/owner.service';
import {
  Hotel,
  RoomRequest,
  RoomType,
  Room,
} from '../../core/model/hotel.model';
import { ImageService } from '../../core/services/image.service';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box.component';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-owner',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatCardComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    ImageUploadComponent,
    ButtonComponent,
  ],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css',
})
export class OwnerComponent implements OnInit {
  activeTab: 'dashboard' | 'hotels' | 'bookings' = 'dashboard';

  private fb = inject(FormBuilder);

  // Dashboard Data
  stats: OwnerStats = {
    totalHotels: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeBookings: 0,
  };

  // Hotels Data
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  hotelSearchTerm: string = '';

  // Bookings Data
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  bookingSearchTerm: string = '';
  bookingFilter: 'all' | 'checkin-today' | 'checkout-today' = 'all';

  loading: boolean = false;
  error: string = '';

  // Create Hotel Dialog
  isCreateHotelDialogOpen: boolean = false;
  isCreatingHotel: boolean = false;
  createHotelError: string = '';
  createHotelSuccess: boolean = false;

  newHotelData: CreateHotelRequest = {
    hotelName: '',
    location: '',
    hotelImage: '',
    googleMapUrl: '',
  };

  // Edit Hotel Dialog
  isEditHotelDialogOpen: boolean = false;
  isUpdatingHotel: boolean = false;
  updateHotelError: string = '';
  updateHotelSuccess: boolean = false;
  editingHotel: Hotel | null = null;

  editHotelData: CreateHotelRequest = {
    hotelName: '',
    location: '',
    hotelImage: '',
    googleMapUrl: '',
  };

  // Add Room Dialog
  isAddRoomDialogOpen: boolean = false;
  isAddingRoom: boolean = false;
  addRoomError: string = '';
  addRoomSuccess: boolean = false;
  selectedHotelForRoom: Hotel | null = null;
  addRoomForm!: FormGroup;
  roomTypes = Object.values(RoomType);

  // View Rooms Dialog
  isViewRoomsDialogOpen: boolean = false;
  isLoadingRooms: boolean = false;
  viewRoomsError: string = '';
  selectedHotelForView: Hotel | null = null;
  hotelRooms: Room[] = [];

  // Edit Room Dialog
  isEditRoomDialogOpen: boolean = false;
  isUpdatingRoom: boolean = false;
  updateRoomError: string = '';
  updateRoomSuccess: boolean = false;
  editingRoom: Room | null = null;
  editRoomForm!: FormGroup;

  isDisabledRoomNumber: boolean = true;

  // Image Upload
  selectedImageFile: File | null = null;
  imagePreviewUrl: string | null = null;
  isUploadingImage: boolean = false;
  uploadImageError: string = '';
  private imageService = inject(ImageService);

  // Edit Image Upload
  editImagePreviewUrl: string | null = null;

  constructor(private ownerService: OwnerService) {}

  ngOnInit(): void {
    this.loadHotels();
    this.loadBookings();
    this.initializeAddRoomForm();
    this.initializeEditRoomForm();
  }

  initializeAddRoomForm(): void {
    this.addRoomForm = this.fb.group({
      roomNumber: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      roomType: [RoomType.SINGLE, Validators.required],
    });
  }

  initializeEditRoomForm(): void {
    this.editRoomForm = this.fb.group({
      roomNumber: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      roomType: [RoomType.SINGLE, Validators.required],
    });
  }

  setActiveTab(tab: 'dashboard' | 'hotels' | 'bookings'): void {
    this.activeTab = tab;
    this.error = '';

    switch (tab) {
      case 'dashboard':
        // this.loadStats();
        break;
      case 'hotels':
        this.loadHotels();
        break;
      case 'bookings':
        this.loadBookings();
        break;
    }
  }

  // Hotel Management Methods
  loadHotels(): void {
    this.loading = true;
    this.ownerService.getMyHotels().subscribe({
      next: (data) => {
        this.hotels = data.data;
        this.filteredHotels = data.data;
        this.stats.totalHotels = this.hotels.length;
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
        hotel.location.toLowerCase().includes(term)
    );
  }

  setBookingFilter(filter: 'all' | 'checkin-today' | 'checkout-today'): void {
    this.bookingFilter = filter;
    this.applyBookingFilters();
  }

  searchBookings(): void {
    this.applyBookingFilters();
  }

  applyBookingFilters(): void {
    const term = this.bookingSearchTerm.toLowerCase();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filtered = this.bookings;

    // Apply date filter
    if (this.bookingFilter === 'checkin-today') {
      filtered = filtered.filter((booking) => {
        const checkInDate = new Date(booking.checkInDate);
        checkInDate.setHours(0, 0, 0, 0);
        return checkInDate.getTime() === today.getTime();
      });
    } else if (this.bookingFilter === 'checkout-today') {
      filtered = filtered.filter((booking) => {
        const checkOutDate = new Date(booking.checkOutDate);
        checkOutDate.setHours(0, 0, 0, 0);
        return checkOutDate.getTime() === today.getTime();
      });
    }

    // Apply search term filter
    if (term) {
      filtered = filtered.filter(
        (booking) =>
          booking.bookingId.toString().includes(term) ||
          (booking.clientName &&
            booking.clientName.toLowerCase().includes(term)) ||
          booking.userId.toString().includes(term) ||
          booking.hotelId.toString().includes(term) ||
          booking.roomId.toString().includes(term)
      );
    }

    this.filteredBookings = filtered;
  }

  openCreateHotelDialog(): void {
    this.isCreateHotelDialogOpen = true;
    this.createHotelError = '';
    this.createHotelSuccess = false;
    this.newHotelData = {
      hotelName: '',
      location: '',
      hotelImage: '',
      googleMapUrl: '',
    };
  }

  closeCreateHotelDialog(): void {
    this.isCreateHotelDialogOpen = false;
    this.createHotelError = '';
    this.createHotelSuccess = false;
  }

  onCreateHotel(): void {
    this.isCreatingHotel = true;
    this.createHotelError = '';
    this.createHotelSuccess = false;

    this.ownerService.createHotel(this.newHotelData).subscribe({
      next: () => {
        this.isCreatingHotel = false;
        this.createHotelSuccess = true;
        this.loadHotels();
        setTimeout(() => {
          this.closeCreateHotelDialog();
        }, 1500);
      },
      error: (err) => {
        this.isCreatingHotel = false;
        this.createHotelError = 'Failed to create hotel. Please try again.';
        console.error(err);
      },
    });
  }

  openEditHotelDialog(hotel: Hotel): void {
    this.editingHotel = hotel;
    this.isEditHotelDialogOpen = true;
    this.updateHotelError = '';
    this.updateHotelSuccess = false;
    this.editHotelData = {
      hotelName: hotel.hotelName,
      location: hotel.location,
      hotelImage: hotel.hotelImage,
      googleMapUrl: hotel.googleMapUrl || '',
    };

    // Set preview if hotel has an image
    if (hotel.hotelImage) {
      this.editImagePreviewUrl = this.getImageUrl(hotel.hotelImage);
    }
  }

  closeEditHotelDialog(): void {
    this.isEditHotelDialogOpen = false;
    this.updateHotelError = '';
    this.updateHotelSuccess = false;
    this.editingHotel = null;
    this.editImagePreviewUrl = null;
  }

  onUpdateHotel(): void {
    if (!this.editingHotel) return;

    this.isUpdatingHotel = true;
    this.updateHotelError = '';
    this.updateHotelSuccess = false;

    this.ownerService
      .updateHotel(this.editingHotel.hotelId, this.editHotelData)
      .subscribe({
        next: () => {
          this.isUpdatingHotel = false;
          this.updateHotelSuccess = true;
          this.loadHotels();
          setTimeout(() => {
            this.closeEditHotelDialog();
          }, 1500);
        },
        error: (err) => {
          this.isUpdatingHotel = false;
          this.updateHotelError = 'Failed to update hotel. Please try again.';
          console.error(err);
        },
      });
  }

  deleteHotel(hotelId: number): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.ownerService.deleteHotel(hotelId).subscribe({
        next: () => {
          this.loadHotels();
        },
        error: (err) => {
          this.error = 'Failed to delete hotel';
          console.error(err);
        },
      });
    }
  }

  // Add Room Methods
  openAddRoomDialog(hotel: Hotel): void {
    this.selectedHotelForRoom = hotel;
    this.isAddRoomDialogOpen = true;
    this.addRoomError = '';
    this.addRoomSuccess = false;
    this.addRoomForm.reset({
      roomNumber: '',
      price: '',
      roomType: RoomType.SINGLE,
    });
  }

  closeAddRoomDialog(): void {
    this.isAddRoomDialogOpen = false;
    this.addRoomError = '';
    this.addRoomSuccess = false;
    this.selectedHotelForRoom = null;
  }

  onAddRoom(): void {
    if (this.addRoomForm.invalid || !this.selectedHotelForRoom) {
      this.addRoomForm.markAllAsTouched();
      return;
    }

    this.isAddingRoom = true;
    this.addRoomError = '';
    this.addRoomSuccess = false;

    const roomData: RoomRequest = {
      roomNumber: this.addRoomForm.value.roomNumber,
      price: this.addRoomForm.value.price,
      roomType: this.addRoomForm.value.roomType,
      hotelId: this.selectedHotelForRoom.hotelId,
    };

    this.ownerService
      .addRoomToHotel(this.selectedHotelForRoom.hotelId, roomData)
      .subscribe({
        next: () => {
          this.isAddingRoom = false;
          this.addRoomSuccess = true;
          // setTimeout(() => {
          //   this.closeAddRoomDialog();
          // }, 1000);
          this.addRoomForm.reset({
            roomNumber: '',
            price: '',
            roomType: RoomType.SINGLE,
          });
        },
        error: (err) => {
          this.isAddingRoom = false;
          this.addRoomError =
            err.error?.detail ||
            err.error?.message ||
            'Failed to add room. Please try again.';
          console.error(err);
        },
      });
  }

  // Getter methods for form controls
  get roomNumber() {
    return this.addRoomForm.get('roomNumber');
  }

  get price() {
    return this.addRoomForm.get('price');
  }

  get roomType() {
    return this.addRoomForm.get('roomType');
  }

  // Getter methods for edit room form controls
  get editRoomNumber() {
    return this.editRoomForm.get('roomNumber');
  }

  get editPrice() {
    return this.editRoomForm.get('price');
  }

  get editRoomType() {
    return this.editRoomForm.get('roomType');
  }

  // View Rooms Methods
  openViewRoomsDialog(hotel: Hotel): void {
    this.selectedHotelForView = hotel;
    this.isViewRoomsDialogOpen = true;
    this.viewRoomsError = '';
    this.hotelRooms = [];
    this.loadHotelRooms(hotel.hotelId);
  }

  closeViewRoomsDialog(): void {
    this.isViewRoomsDialogOpen = false;
    this.viewRoomsError = '';
    this.selectedHotelForView = null;
    this.hotelRooms = [];
  }

  openAddRoomFromView(): void {
    if (this.selectedHotelForView) {
      const hotel = this.selectedHotelForView;
      this.closeViewRoomsDialog();
      this.openAddRoomDialog(hotel);
    }
  }

  loadHotelRooms(hotelId: number): void {
    this.isLoadingRooms = true;
    this.viewRoomsError = '';

    this.ownerService.getAllRoomByHotelId(hotelId).subscribe({
      next: (response) => {
        this.hotelRooms = response.data || [];
        this.isLoadingRooms = false;
      },
      error: (err) => {
        this.isLoadingRooms = false;
        // If it's a 404 or method not supported error, just show empty rooms
        if (
          err.status === 404 ||
          err.status === 405 ||
          err.error?.title === 'Method Not Allowed'
        ) {
          this.hotelRooms = [];
        } else {
          this.viewRoomsError =
            err.error?.detail ||
            err.error?.message ||
            'Failed to load rooms. Please try again.';
        }
        console.error(err);
      },
    });
  }

  getRoomStatusClass(room: Room): string {
    if (room.available) return 'room-available';
    if (room.booked) return 'room-booked';
    return 'room-unavailable';
  }

  getRoomStatusText(room: Room): string {
    if (room.available) return 'Available';
    if (room.booked) return 'Booked';
    return 'Unavailable';
  }

  // Edit Room Methods
  openEditRoomDialog(room: Room): void {
    this.editingRoom = room;
    this.isEditRoomDialogOpen = true;
    this.updateRoomError = '';
    this.updateRoomSuccess = false;
    this.editRoomForm.patchValue({
      roomNumber: room.roomNumber,
      price: room.price,
      roomType: room.roomType,
    });
  }

  closeEditRoomDialog(): void {
    this.isEditRoomDialogOpen = false;
    this.updateRoomError = '';
    this.updateRoomSuccess = false;
    this.editingRoom = null;
    this.editRoomForm.reset();
  }

  onUpdateRoom(): void {
    if (this.editRoomForm.invalid || !this.editingRoom) {
      this.editRoomForm.markAllAsTouched();
      return;
    }

    this.isUpdatingRoom = true;
    this.updateRoomError = '';
    this.updateRoomSuccess = false;

    const roomData: Partial<RoomRequest> = {
      roomNumber: this.editRoomForm.value.roomNumber,
      price: this.editRoomForm.value.price,
      roomType: this.editRoomForm.value.roomType,
    };

    this.ownerService.updateRoom(this.editingRoom.roomId, roomData).subscribe({
      next: () => {
        this.isUpdatingRoom = false;
        this.updateRoomSuccess = true;
        // Reload rooms to show updated data
        if (this.selectedHotelForView) {
          this.loadHotelRooms(this.selectedHotelForView.hotelId);
        }
        setTimeout(() => {
          this.closeEditRoomDialog();
        }, 1500);
      },
      error: (err) => {
        this.isUpdatingRoom = false;
        this.updateRoomError =
          err.error?.detail ||
          err.error?.message ||
          'Failed to update room. Please try again.';
        console.error(err);
      },
    });
  }

  // Booking Management Methods
  loadBookings(): void {
    this.loading = true;
    this.ownerService.getMyHotelBookings().subscribe({
      next: (data) => {
        this.bookings = data.data;
        this.applyBookingFilters();
        console.log(this.bookings);

        this.stats.totalBookings = this.bookings.length;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load bookings';
        this.loading = false;
        console.error(err);
      },
    });
  }

  updateBookingStatus(bookingId: number, status: string): void {
    this.ownerService.updateBookingStatus(bookingId, status).subscribe({
      next: () => {
        this.loadBookings();
      },
      error: (err) => {
        this.error = 'Failed to update booking status';
        console.error(err);
      },
    });
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      PENDING: 'status-pending',
      CONFIRMED: 'status-confirmed',
      CANCELLED: 'status-cancelled',
      COMPLETED: 'status-completed',
    };
    return statusMap[status] || '';
  }

  // Image Upload Methods
  onImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.uploadImageError = 'Please select a valid image file';
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.uploadImageError = 'Image size must be less than 5MB';
        return;
      }

      this.selectedImageFile = file;
      this.uploadImageError = '';

      // Auto-upload the image
      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (!this.selectedImageFile) {
      this.uploadImageError = 'Please select an image file';
      return;
    }

    this.isUploadingImage = true;
    this.uploadImageError = '';

    this.imageService.uploadImage(this.selectedImageFile).subscribe({
      next: (response) => {
        this.isUploadingImage = false;
        this.newHotelData.hotelImage = response.data.fileName;

        // Create preview after successful upload
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviewUrl = e.target?.result as string;
        };
        reader.readAsDataURL(this.selectedImageFile!);

        console.log('Image uploaded successfully:', response.data);
      },
      error: (err) => {
        this.isUploadingImage = false;
        this.uploadImageError = 'Failed to upload image. Please try again.';
        console.error('Image upload error:', err);
      },
    });
  }

  clearImageSelection(): void {
    this.selectedImageFile = null;
    this.imagePreviewUrl = null;
    this.uploadImageError = '';
    this.newHotelData.hotelImage = '';
  }

  // Edit Image Upload Methods
  onEditImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.uploadImageError = 'Please select a valid image file';
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.uploadImageError = 'Image size must be less than 5MB';
        return;
      }

      this.selectedImageFile = file;
      this.uploadImageError = '';

      // Auto-upload the image
      this.uploadEditImage();
    }
  }

  uploadEditImage(): void {
    if (!this.selectedImageFile) {
      this.uploadImageError = 'Please select an image file';
      return;
    }

    this.isUploadingImage = true;
    this.uploadImageError = '';

    this.imageService.uploadImage(this.selectedImageFile).subscribe({
      next: (response) => {
        this.isUploadingImage = false;
        this.editHotelData.hotelImage = response.data.fileName;

        // Create preview after successful upload
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editImagePreviewUrl = e.target?.result as string;
        };
        reader.readAsDataURL(this.selectedImageFile!);

        console.log('Image uploaded successfully:', response.data);
      },
      error: (err) => {
        this.isUploadingImage = false;
        this.uploadImageError = 'Failed to upload image. Please try again.';
        console.error('Image upload error:', err);
      },
    });
  }

  clearEditImageSelection(): void {
    this.selectedImageFile = null;
    this.editImagePreviewUrl = null;
    this.uploadImageError = '';
    this.editHotelData.hotelImage = '';
  }

  // Helper method to get image URL
  getImageUrl(fileName: string): string {
    if (!fileName) return '';
    return `http://localhost:8080/api/v1/images/${fileName}`;
  }
}
