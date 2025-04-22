import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomenavbarComponent } from '../homenavbar/homenavbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userlogin',
  imports: [CommonModule,FormsModule,HomenavbarComponent],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    this.authService.loginUser(this.loginData).subscribe({
      next: (response: any) => {
        if (response && response.errorStatusCode === 1) {
          this.successMessage = 'Login successful!';
          sessionStorage.setItem('loggedInUser', JSON.stringify(response));
          this.router.navigate(['/userdashboard']);
        } else {
          this.errorMessage = response.errorMessage || 'Login failed';
        }
      },
      error: (error) => {
        this.errorMessage = 'An error occurred during login';
        console.error(error);
      }
    });
  }
  }

