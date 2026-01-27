import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HotelComponent } from './features/hotel/hotel.component';
import { HotelDetailComponent } from './features/hotel/hotel-detail/hotel-detail.component';
import { BookingComponent } from './features/booking/booking.component';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AdminComponent } from './features/admin/admin.component';
import { OwnerComponent } from './features/owner/owner.component';
import { AttractionDetailComponent } from './features/attraction-detail/attraction-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'hotels',
    component: HotelComponent,
  },
  {
    path: 'hotels/:id',
    component: HotelDetailComponent,
  },
  {
    path: 'attraction/:id',
    component: AttractionDetailComponent,
  },
  {
    path: 'bookings',
    component: BookingComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'owner',
    component: OwnerComponent,
  },
];
