import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignUpService } from './service/sign-up.service';
import { SignupRequest } from '../../core/model/auth.model';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  signUpForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private signUpService: SignUpService) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  userSignUp(): void {
    const formData: SignupRequest = {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
      role: 'ROLE_CLIENT',
    };

    this.signUpService.signUp(formData).subscribe({
      next: () => {
        console.log('register successfully');
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'Failed to create account. Please try again.';
        console.error('Error during sign up:', error);
      },
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    console.log('Sign up data:', this.signUpForm.value);
    this.userSignUp();
  }

  // Getter methods for easy access to form controls
  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
