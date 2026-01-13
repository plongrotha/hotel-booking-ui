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

  navigateToAttractionDetail(attractionId: number) {
    this.router.navigate(['/attraction', attractionId]);
  }

  // Cambodia Cambodia Tourist Attractions
  touristAttractions = [
    {
      id: 1,
      name: 'Angkor Wat',
      location: 'Siem Reap, Cambodia',
      category: 'Historical Temple',
      image:
        'https://i.pinimg.com/1200x/5b/a2/ae/5ba2ae8012bb08db10695f6c084f5a66.jpg',
      description: 'Largest religious monument in the world',
      visitors: '2.6M/year',
    },
    {
      id: 2,
      name: 'Bayon Temple',
      location: 'Siem Reap, Cambodia',
      category: 'Historical Temple',
      image:
        'https://i.pinimg.com/1200x/a5/6d/e9/a56de929defc9a01c03f6a82106511c1.jpg',
      description: 'Temple with giant stone faces',
      visitors: '2M/year',
    },
    {
      id: 3,
      name: 'Ta Prohm',
      location: 'Siem Reap, Cambodia',
      category: 'Historical Temple',
      image:
        'https://i.pinimg.com/736x/44/c1/4f/44c14f5bdf21457f4e0a57139434c9fc.jpg',
      description: 'Temple overtaken by jungle trees',
      visitors: '1.8M/year',
    },
    {
      id: 4,
      name: 'Royal Palace',
      location: 'Phnom Penh, Cambodia',
      category: 'Palace',
      image:
        'https://i.pinimg.com/1200x/e0/87/ea/e087ea3f7e149a124f77b07fefb414e9.jpg',
      description: 'Official residence of the King of Cambodia',
      visitors: '1M/year',
    },
    {
      id: 5,
      name: 'Silver Pagoda',
      location: 'Phnom Penh, Cambodia',
      category: 'Temple',
      image:
        'https://i.pinimg.com/736x/54/fb/0c/54fb0c0e7122b22084658c27b34c005c.jpg',
      description: 'Temple with floor covered in silver tiles',
      visitors: '900K/year',
    },
    {
      id: 6,
      name: 'Tonle Sap Lake',
      location: 'Siem Reap, Cambodia',
      category: 'Natural Wonder',
      image:
        'https://i.pinimg.com/1200x/83/6f/35/836f352d68e26c625eb8cc1b453f8e3d.jpg',
      description: 'Southeast Asias largest freshwater lake',
      visitors: '800K/year',
    },
    {
      id: 7,
      name: 'Bokor National Park',
      location: 'Kampot, Cambodia',
      category: 'National Park',
      image:
        'https://i.pinimg.com/1200x/f1/15/de/f115de11b4a90e00f36c6e585bd30a9d.jpg',
      description: 'Mountain park with abandoned French hill station',
      visitors: '500K/year',
    },
    {
      id: 8,
      name: 'Koh Rong Island',
      location: 'Sihanoukville, Cambodia',
      category: 'Beach',
      image:
        'https://i.pinimg.com/736x/5a/d7/d0/5ad7d0e1cf83adeb868b48daaabcd19e.jpg',
      description: 'Paradise island with pristine beaches',
      visitors: '600K/year',
    },
  ];
}
