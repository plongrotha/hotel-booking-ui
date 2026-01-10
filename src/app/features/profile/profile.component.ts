import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from './service/profile.service';
import { UserResponse, UserUpdate } from '../../core/model/user.model';
import { SignInService } from '../sign-in/service/sign-in.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private profileService = inject(ProfileService);
  private signInService = inject(SignInService);
  private router = inject(Router);

  userProfileInfo: UserResponse = {
    id: 0,
    publicId: '',
    username: '',
    role: '',
    age: 0,
    dateOfBirth: '',
    enabled: true,
    firstName: '',
    lastName: '',
    image: '',
    isLogin: true,
  };

  isLoading = true;
  isEditDialogOpen = false;
  isUpdating = false;
  updateError = '';
  updateSuccess = false;

  editFormData: UserUpdate = {
    firstName: '',
    lastName: '',
    username: '',
    birthDate: '',
  };

  ngOnInit(): void {
    console.log(
      'this is i called service : ',
      this.profileService.getUserProfile()
    );

    this.profileService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfileInfo = profile.data;
        this.isLoading = false;
        console.log(this.userProfileInfo);
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('User profile fetch completed.');
      },
    });
  }

  openEditDialog(): void {
    this.editFormData = {
      firstName: this.userProfileInfo.firstName,
      lastName: this.userProfileInfo.lastName,
      username: this.userProfileInfo.username,
      birthDate: this.userProfileInfo.dateOfBirth,
    };
    this.isEditDialogOpen = true;
    this.updateError = '';
    this.updateSuccess = false;
  }

  closeEditDialog(): void {
    this.isEditDialogOpen = false;
    this.updateError = '';
    this.updateSuccess = false;
  }

  onUpdateProfile(): void {
    this.isUpdating = true;
    this.updateError = '';
    this.updateSuccess = false;

    this.profileService.updateUserProfile(this.editFormData).subscribe({
      next: (response) => {
        console.log('User profile updated successfully.', response);
        this.updateSuccess = true;
        this.isUpdating = false;

        // Refresh profile data
        setTimeout(() => {
          this.closeEditDialog();
          this.ngOnInit();
        }, 1500);
      },
      error: (error) => {
        console.error('Error updating user profile:', error);
        this.updateError = 'Failed to update profile. Please try again.';
        this.isUpdating = false;
      },
    });
  }

  updateUserProfile(userData: Partial<UserUpdate>): void {
    this.profileService.updateUserProfile(userData).subscribe({
      next: () => {
        console.log('User profile updated successfully.');
      },
      error: (error) => {
        console.error('Error updating user profile:', error);
      },
      complete: () => {
        console.log('User profile update completed.');
      },
    });
  }

  onLogout(): void {
    this.signInService.removeTokens();
    this.router.navigate(['/sign-in']);
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  navigateToOwner(): void {
    this.router.navigate(['/owner']);
  }

  getInitials(): string {
    const first = this.userProfileInfo.firstName?.charAt(0) || '';
    const last = this.userProfileInfo.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'U';
  }
}
