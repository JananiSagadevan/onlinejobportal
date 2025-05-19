import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomenavbarComponent } from '../homenavbar/homenavbar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-register',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,HomenavbarComponent],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent  {
  registerForm: FormGroup;
  registrationSuccess: string = '';
  registrationFail: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ){
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordhash: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }

  registerJobSeeker() {
    if (this.registerForm.invalid) {
      this.registrationFail = 'Please fill all the required fields correctly.';
      return;
    }

    const formData = this.registerForm.value;
    this.isSubmitting = true;

    // ⬇️ Call the API
    this.authService.registerUser(formData).subscribe({
      next: (response) => {
        this.registrationSuccess = 'Registration successful! Redirecting to dashboard...';
        this.registrationFail = '';
        this.isSubmitting = false;
        localStorage.setItem('FullName', response.name); 

        setTimeout(() => {
          this.router.navigate(['/userdashboard']);
        }, 2000);
      },
      error: (error) => {
        this.registrationFail = error?.error?.message || 'Registration failed. Please try again.';
        this.registrationSuccess = '';
        this.isSubmitting = false;
      }
    });
  }
}
