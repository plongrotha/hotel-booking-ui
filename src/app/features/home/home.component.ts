import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchData = {
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  };

  constructor(private router: Router) {}

  onSearch() {
    this.router.navigate(['/hotel'], { queryParams: this.searchData });
  }

  // Cambodia Cambodia Tourist Attractions
  touristAttractions = [
    {
      id: 1,
      name: 'Angkor Wat',
      location: 'Siem Reap, Cambodia',
      category: 'Historical Temple',
      image:
        'https://images.unsplash.com/photo-1570797197190-8e003a00c846?w=600',
      description: 'Largest religious monument in the world',
      visitors: '2.6M/year',
    },
    {
      id: 2,
      name: 'Bayon Temple',
      location: 'Siem Reap, Cambodia',
      category: 'Historical Temple',
      image:
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600',
      description: 'Temple with giant stone faces',
      visitors: '2M/year',
    },
    {
      id: 3,
      name: 'Ta Prohm',
      location: 'Siem Reap, Cambodia',
      category: 'Historical Temple',
      image:
        'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=600',
      description: 'Temple overtaken by jungle trees',
      visitors: '1.8M/year',
    },
    {
      id: 4,
      name: 'Royal Palace',
      location: 'Phnom Penh, Cambodia',
      category: 'Palace',
      image:
        'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=600',
      description: 'Official residence of the King of Cambodia',
      visitors: '1M/year',
    },
    {
      id: 5,
      name: 'Silver Pagoda',
      location: 'Phnom Penh, Cambodia',
      category: 'Temple',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600',
      description: 'Temple with floor covered in silver tiles',
      visitors: '900K/year',
    },
    {
      id: 6,
      name: 'Tonle Sap Lake',
      location: 'Siem Reap, Cambodia',
      category: 'Natural Wonder',
      image:
        'https://images.unsplash.com/photo-1528127269322-539801943592?w=600',
      description: 'Southeast Asias largest freshwater lake',
      visitors: '800K/year',
    },
    {
      id: 7,
      name: 'Bokor National Park',
      location: 'Kampot, Cambodia',
      category: 'National Park',
      image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=600',
      description: 'Mountain park with abandoned French hill station',
      visitors: '500K/year',
    },
    {
      id: 8,
      name: 'Koh Rong Island',
      location: 'Sihanoukville, Cambodia',
      category: 'Beach',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      description: 'Paradise island with pristine beaches',
      visitors: '600K/year',
    },
  ];
}
