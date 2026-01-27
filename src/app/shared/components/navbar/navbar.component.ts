import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInService } from '../../../features/sign-in/service/sign-in.service';
import { LucideAngularModule, LucideHome, UserIcon } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private signInService = inject(SignInService);
  isMenuOpen = false;
  readonly UserIcon = UserIcon;
  readonly HomeIcon = LucideHome;

  constructor() {
    this.isUserLoggedIn();
  }

  isUserLoggedIn(): boolean {
    return this.signInService.isLoggedIn();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
