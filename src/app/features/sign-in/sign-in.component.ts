import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignInService } from './service/sign-in.service';
import { SigninRequest } from '../../core/model/auth.model';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  private signInService = inject(SignInService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  signInForm!: FormGroup;
  showPassword = false;
  rememberMe = false;
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData: SigninRequest = {
      username: this.signInForm.value.username,
      password: this.signInForm.value.password,
    };

    this.signInService.signIn(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        console.log('Login successful');
        // Tokens are already saved in the service via tap operator

        // Navigate to home page after successful sign in
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message ||
          'Invalid username or password. Please try again.';
      },
    });
  }

  // Getter methods for easy access to form controls
  get username() {
    return this.signInForm.get('username');
  }

  get password() {
    return this.signInForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
