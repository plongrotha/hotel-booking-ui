import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';

interface TouristAttraction {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
  description: string;
  visitors: string;
  history?: string;
  detailedDescription?: string;
  bestTimeToVisit?: string;
  entryFee?: string;
  openingHours?: string;
  additionalImages?: string[];
  facts?: string[];
}

@Component({
  selector: 'app-attraction-detail',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './attraction-detail.component.html',
  styleUrls: ['./attraction-detail.component.css'],
})
export class AttractionDetailComponent implements OnInit {
  attraction: TouristAttraction | null = null;

  // Extended data with detailed information
  private attractionsData: TouristAttraction[] = [
    {
      id: 1,
      name: 'Angkor Wat',
      location: 'Siem Reap, Cambodia',
      category: 'Historical Temple',
      image:
        'https://i.pinimg.com/1200x/5b/a2/ae/5ba2ae8012bb08db10695f6c084f5a66.jpg',
      description: 'Largest religious monument in the world',
      visitors: '2.6M/year',
      history: `Angkor Wat, built in the early 12th century by King Suryavarman II, is the largest religious monument in the world. It was originally constructed as a Hindu temple dedicated to Vishnu, but later became a Buddhist temple. The temple complex covers an area of about 500 acres and features intricate bas-reliefs depicting scenes from Hindu mythology and Khmer history.

The construction of Angkor Wat began around 1113 AD and took approximately 30 years to complete. It was built during the height of the Khmer Empire, which was one of the most powerful empires in Southeast Asia. The temple was designed to represent Mount Meru, the sacred mountain at the center of the universe in Hindu and Buddhist cosmology.

During the 15th century, when the Khmer Empire declined, Angkor Wat was abandoned and gradually became overgrown with jungle vegetation. It was rediscovered by French explorer Henri Mouhot in 1860, and since then has been the subject of extensive restoration efforts by archaeologists and conservators from around the world.`,
      detailedDescription: `Angkor Wat is a masterpiece of Khmer architecture and engineering. The temple is surrounded by a moat measuring 190 meters wide, and the complex is entered through a causeway lined with stone figures called devatas. The central tower of the temple rises 65 meters above the ground and is surrounded by four smaller towers.

The walls of Angkor Wat are covered with thousands of square meters of bas-reliefs, which are considered among the finest examples of Khmer art. These reliefs depict scenes from the Ramayana and Mahabharata epics, as well as historical events from the reign of King Suryavarman II.

The temple is particularly spectacular at sunrise and sunset when the light creates a golden glow on the stone surfaces. Visitors can explore the various galleries, libraries, and courtyards that make up this architectural wonder.`,
      bestTimeToVisit: 'November to March (dry season)',
      entryFee: '$37 for 1-day pass, $62 for 3-day pass',
      openingHours: '5:00 AM - 6:00 PM',
      additionalImages: [
        'https://i.pinimg.com/1200x/8a/4c/9d/8a4c9d2b8e8b8e8b8e8b8e8b8e8b8e8b.jpg',
        'https://i.pinimg.com/1200x/9b/5c/8d/9b5c8d2b8e8b8e8b8e8b8e8b8e8b8e8b.jpg',
      ],
      facts: [
        'Built between 1113-1150 AD',
        'Covers an area of 500 acres',
        'Features over 2,000 devatas (stone figures)',
        'Listed as UNESCO World Heritage Site in 1992',
        "Appears on Cambodia's national flag",
      ],
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
      history: `The Bayon Temple was built in the late 12th century during the reign of King Jayavarman VII, who ruled the Khmer Empire from 1181 to 1218 AD. Unlike most Khmer temples which were dedicated to Hindu deities, the Bayon was primarily a Buddhist temple, reflecting Jayavarman VII's devotion to Buddhism.

The temple is famous for its 216 gigantic stone faces that adorn the 54 towers of the central sanctuary. These faces are believed to represent either the Bodhisattva Avalokiteshvara or King Jayavarman VII himself, symbolizing the king's omnipresence and compassion.

The Bayon was the last state temple built in the Angkor region and represents the pinnacle of Khmer architectural and artistic achievement. It was part of the larger Angkor Thom complex, which served as the capital city of the Khmer Empire.`,
      detailedDescription: `The Bayon Temple is renowned for its unique architectural style and the enigmatic smiling faces that seem to watch over visitors from every angle. The faces are carved with a serene, almost mysterious expression that has captivated visitors for centuries.

The temple complex consists of three levels, with the upper level containing the central sanctuary surrounded by 54 towers. Each tower features four faces oriented towards the cardinal directions. The bas-reliefs on the temple walls depict scenes of everyday life in the Khmer Empire, including markets, festivals, and royal ceremonies.

The Bayon represents a transition in Khmer architecture from Hindu to Buddhist influences, reflecting the religious changes that occurred during Jayavarman VII's reign.`,
      bestTimeToVisit: 'November to March',
      entryFee: 'Included in Angkor Pass',
      openingHours: '7:30 AM - 5:30 PM',
      facts: [
        'Built around 1181-1220 AD',
        'Features 216 stone faces on 54 towers',
        'Part of the Angkor Thom complex',
        'Represents Buddhist architecture',
        'Faces may depict King Jayavarman VII',
      ],
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
      history: `Ta Prohm was built in the late 12th century by King Jayavarman VII as a Buddhist monastery and university. It was dedicated to the king's mother and served as a center for learning and spiritual practice.

The temple was intentionally left in a partially ruined state during restoration efforts to preserve the natural beauty of the jungle growth that has overtaken the stone structures. Massive tree roots intertwine with the ancient stones, creating a dramatic and romantic atmosphere that has made Ta Prohm one of the most photographed sites in Angkor.`,
      detailedDescription: `Ta Prohm is often called the "Jungle Temple" because of the way nature has reclaimed the ancient stone structures. Giant silk-cotton trees and strangler figs have grown through the temple walls and roofs, their roots creating natural sculptures that blend seamlessly with the Khmer architecture.

The temple complex includes numerous buildings, courtyards, and galleries that were once used for religious ceremonies and education. The walls are decorated with intricate carvings depicting Buddhist scenes and mythological figures.

Ta Prohm has been featured in several films, including the Tomb Raider movie, which helped popularize its mysterious and adventurous atmosphere.`,
      bestTimeToVisit: 'November to March',
      entryFee: 'Included in Angkor Pass',
      openingHours: '7:30 AM - 5:30 PM',
      facts: [
        'Built in 1186 AD',
        "Dedicated to King Jayavarman VII's mother",
        'Features giant tree roots growing through stone',
        'Used in Tomb Raider movie',
        'Partially unrestored to preserve natural beauty',
      ],
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
      history: `The Royal Palace in Phnom Penh was built in 1866 during the reign of King Norodom I, following the move of the Cambodian capital from Oudong to Phnom Penh. The palace was constructed with the assistance of Thai and Vietnamese architects and represents a blend of Khmer, Thai, and French architectural styles.

The Silver Pagoda, located within the palace complex, houses many of Cambodia's most sacred Buddhist relics, including a 17th-century emerald Buddha and a life-sized gold Buddha encrusted with 9,584 diamonds.

During the Khmer Rouge regime (1975-1979), the palace was used as a prison and storage facility, but it was restored after the fall of the regime and continues to serve as the official residence of the King of Cambodia.`,
      detailedDescription: `The Royal Palace complex covers an area of about 500,000 square meters and includes several important buildings. The main throne hall, where official ceremonies are held, features a golden throne and intricate decorations.

The Silver Pagoda gets its name from its floor, which is covered with over 5,000 silver tiles. The temple houses the Emerald Buddha, a sacred statue brought from Sri Lanka, and various other religious artifacts.

The palace gardens are beautifully landscaped and provide a peaceful retreat in the heart of the bustling city.`,
      bestTimeToVisit: 'November to March',
      entryFee: '$10 for foreigners',
      openingHours: '8:00 AM - 5:00 PM',
      facts: [
        'Built in 1866',
        'Official residence of Cambodian kings',
        'Features Silver Pagoda with 5,000+ silver tiles',
        'Houses sacred Emerald Buddha',
        'Blend of Khmer, Thai, and French architecture',
      ],
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
      history: `The Silver Pagoda, also known as Wat Preah Keo Morakot, was built in the late 19th century and is located within the Royal Palace complex. The temple gets its name from its floor, which is covered with over 5,000 silver tiles.

The pagoda houses some of Cambodia's most sacred Buddhist relics, including a 17th-century emerald Buddha statue that was brought from Sri Lanka. The temple also contains a life-sized gold Buddha statue that is encrusted with 9,584 diamonds, making it one of the most valuable religious artifacts in Cambodia.

The Silver Pagoda has been a center of Buddhist worship and royal ceremonies for over a century.`,
      detailedDescription: `The Silver Pagoda is renowned for its exquisite craftsmanship and religious significance. The floor is indeed covered with 5,329 silver tiles, each weighing about 1.125 kg, creating a shimmering surface that reflects the light beautifully.

The temple houses numerous sacred objects, including ancient palm leaf manuscripts, golden Buddha statues, and royal regalia. The Emerald Buddha, the temple's most sacred possession, is believed to bring prosperity and protection to the Cambodian people.

The surrounding buildings within the Royal Palace complex complement the pagoda's beauty and create a serene atmosphere for worship and contemplation.`,
      bestTimeToVisit: 'November to March',
      entryFee: 'Included with Royal Palace ticket',
      openingHours: '8:00 AM - 5:00 PM',
      facts: [
        'Floor covered with 5,329 silver tiles',
        'Houses Emerald Buddha from Sri Lanka',
        'Contains gold Buddha with 9,584 diamonds',
        'Located within Royal Palace complex',
        'Important center for Buddhist ceremonies',
      ],
    },
    {
      id: 6,
      name: 'Tonle Sap Lake',
      location: 'Siem Reap, Cambodia',
      category: 'Natural Wonder',
      image:
        'https://i.pinimg.com/1200x/83/6f/35/836f352d68e26c625eb8cc1b453f8e3d.jpg',
      description: "Southeast Asia's largest freshwater lake",
      visitors: '800K/year',
      history: `Tonle Sap Lake is Southeast Asia's largest freshwater lake and plays a crucial role in Cambodian culture and economy. The lake's unique characteristics - it changes size dramatically between wet and dry seasons - have shaped the way of life for communities around it for centuries.

During the wet season (June to October), the lake can expand to cover an area of up to 16,000 square kilometers, while in the dry season it shrinks to about 3,000 square kilometers. This phenomenon is caused by the Mekong River's flow reversal during the monsoon season.

The lake has been an important source of fish and fertile soil for Cambodian farmers for generations. Floating villages on the lake have existed for centuries and continue to be inhabited by communities that live on houseboats.`,
      detailedDescription: `Tonle Sap Lake is not just a body of water; it's a dynamic ecosystem that supports millions of people and countless species. The lake is home to the largest freshwater fish in the world, the giant Mekong catfish, and supports one of the world's most productive freshwater fisheries.

Visitors can take boat tours to see the floating villages, fish farms, and traditional way of life on the lake. The Chong Khneas area near Siem Reap offers tourist boat trips to experience this unique environment.

The lake's biodiversity and cultural significance make it a UNESCO Biosphere Reserve, highlighting its importance for conservation and sustainable development.`,
      bestTimeToVisit: 'November to March',
      entryFee: '$20 for boat tour',
      openingHours: 'Open daily',
      facts: [
        "Southeast Asia's largest freshwater lake",
        'Area varies from 3,000 to 16,000 km²',
        'Supports 3 million people',
        'Home to giant Mekong catfish',
        'UNESCO Biosphere Reserve',
      ],
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
      history: `Bokor National Park was established as a French colonial hill station in the early 20th century. The French built a luxurious resort here in 1921 to escape the heat of the Cambodian plains, complete with a church, casino, and grand hotel.

The hill station was abandoned during the Khmer Rouge period and later conflicts, leaving behind eerie ruins that have become a popular destination for adventure seekers and history enthusiasts. The park was officially established in 1993 and covers an area of 1,541 square kilometers.

Today, Bokor offers a mix of natural beauty, colonial history, and outdoor activities, attracting visitors who want to explore both nature and the remnants of Cambodia's colonial past.`,
      detailedDescription: `Bokor National Park is located on the Bokor Mountain plateau at an elevation of about 1,000 meters above sea level. The park offers stunning views of the Gulf of Thailand and is home to diverse wildlife including elephants, tigers, and various bird species.

The abandoned French buildings, including the Bokor Palace Hotel and the Black Palace, have become popular attractions. Visitors can explore these ruins while learning about Cambodia's colonial history and the impact of war and revolution.

The park also features waterfalls, hiking trails, and viewpoints that provide panoramic vistas of the surrounding landscape.`,
      bestTimeToVisit: 'November to March',
      entryFee: '$5 for foreigners',
      openingHours: '6:00 AM - 6:00 PM',
      facts: [
        'Established as French hill station in 1921',
        'Abandoned during Khmer Rouge period',
        'Covers 1,541 square kilometers',
        'Elevation of 1,000 meters',
        'Features abandoned colonial buildings',
      ],
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
      history: `Koh Rong Island has been inhabited for centuries, with evidence of human settlement dating back to prehistoric times. The island was sparsely populated until the 1990s when tourism began to develop.

The island's pristine beaches and clear waters attracted backpackers and adventure seekers, leading to the development of resorts and tourist infrastructure. Today, Koh Rong is known for its beautiful beaches, coral reefs, and laid-back atmosphere.

The island maintains much of its natural beauty while offering modern amenities for visitors seeking a tropical paradise experience.`,
      detailedDescription: `Koh Rong Island is the second largest island in Cambodia and offers some of the most beautiful beaches in Southeast Asia. The island features white sand beaches, clear turquoise waters, and lush tropical vegetation.

Popular activities include snorkeling, diving, beach relaxation, and exploring the island's interior jungles. The island has developed a reputation for its vibrant nightlife and party atmosphere, particularly around the main beach areas.

Koh Rong is also home to bioluminescent plankton that create a magical glowing effect in the water at night, making it a unique natural phenomenon.`,
      bestTimeToVisit: 'November to March',
      entryFee: 'Free',
      openingHours: 'Open daily',
      facts: [
        'Second largest Cambodian island',
        'Features bioluminescent plankton',
        'Known for pristine beaches',
        'Popular for snorkeling and diving',
        'Mix of relaxation and nightlife',
      ],
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.attraction =
      this.attractionsData.find((attr) => attr.id === +id) || null;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  navigateToHotels() {
    if (this.attraction) {
      this.router.navigate(['/hotel'], {
        queryParams: { destination: this.attraction.location },
      });
    }
  }
  getRelatedAttractions() {
    if (!this.attraction) return [];
    return this.attractionsData
      .filter((attr) => attr.id !== this.attraction!.id)
      .slice(0, 3);
  }

  navigateToAttraction(id: number) {
    this.router.navigate(['/attraction', id]);
  }
}
