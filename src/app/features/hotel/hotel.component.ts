import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from '../../core/model/hotel.model';
import { HotelService } from './service/hotel.service';
import { ImageService } from '../../core/services/image.service';

@Component({
  selector: 'app-hotel',
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css',
})
export class HotelComponent {
  private hotelService = inject(HotelService);
  private imageService = inject(ImageService);
  private router = inject(Router);

  hotels: Hotel[] = [];
  allHotels: Hotel[] = [];
  isLoading = true;
  errorMessage = '';
  selectedLocation = '';
  uniqueLocations: string[] = [];

  // Pagination
  page: number = 0;
  size: number = 8;
  totalElements: number = 0;
  totalPages: number = 0;

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.hotelService.getAllHotelsPaginated(this.page, this.size).subscribe({
      next: (res) => {
        this.allHotels = res.data?.content || [];
        this.hotels = res.data?.content || [];
        this.totalElements = res.data?.totalElements || 0;
        this.totalPages = res.data?.totalPages || 0;
        this.extractUniqueLocations();
        this.isLoading = false;
        console.log('Hotels loaded:', res);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load hotels. Please try again.';
        console.error('Error loading hotels:', error);
      },
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadHotels();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadHotels();
    }
  }

  goToPage(pageNumber: number): void {
    this.page = pageNumber;
    this.loadHotels();
  }

  extractUniqueLocations(): void {
    const locations = this.allHotels.map((hotel) => hotel.location);
    this.uniqueLocations = [...new Set(locations)].sort();
  }

  filterByLocation(): void {
    if (this.selectedLocation === '') {
      this.hotels = this.allHotels;
    } else {
      this.hotels = this.allHotels.filter(
        (hotel) => hotel.location === this.selectedLocation
      );
    }
  }

  clearFilter(): void {
    this.selectedLocation = '';
    this.hotels = this.allHotels;
  }

  getImageUrl(fileName: string): string {
    if (!fileName) return '';
    return `http://localhost:8080/api/v1/images/${fileName}`;
  }

  viewHotelDetails(hotelId: number): void {
    this.router.navigate(['/hotels', hotelId]);
  }

  // get filteredHotels() {
  //   return this.allHotels.filter((hotel) => {
  //     const matchesCity =
  //       !this.filters.city || hotel.city === this.filters.city;
  //     const matchesProvince =
  //       !this.filters.province || hotel.province === this.filters.province;
  //     const matchesPrice =
  //       !this.filters.priceRange || this.filterByPrice(hotel.price);
  //     const matchesRating =
  //       !this.filters.rating || hotel.rating >= parseFloat(this.filters.rating);
  //     return matchesCity && matchesProvince && matchesPrice && matchesRating;
  //   });
  // }
  // filterByPrice(price: number): boolean {
  //   switch (this.filters.priceRange) {
  //     case 'low':
  //       return price < 150;
  //     case 'medium':
  //       return price >= 150 && price < 250;
  //     case 'high':
  //       return price >= 250;
  //     default:
  //       return true;
  //   }
  // }
  // clearFilters() {
  //   this.filters = {
  //     city: '',
  //     province: '',
  //     priceRange: '',
  //     rating: '',
  //   };
  // }
}
