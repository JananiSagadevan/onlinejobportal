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
  email: string = '';
  fullName : string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string='';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
  
    const loginData = {
      email: this.email,
      password: this.password
    };
  
    this.authService.loginUser(loginData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          const user = response.data;
          console.log(localStorage.getItem('user'));
          console.log('Storing fullName in localStorage:', user.fullName);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('jobSeekerId',user.jobSeekerId);
          this.successMessage = response.message;
          console.log('User FullName: ', user.fullName);
       
          console.log(localStorage.getItem('jobSeekerId'));
          //this.fullName=user.fullName
          console.log('User Full Name:', response.data.fullName);
          console.log('Stored fullName:', localStorage.getItem('fullName'));
          if (response.fullName) {
            localStorage.setItem('fullName', response.data.fullName);
            console.log('Stored fullName:', response.data.fullName);
          } else {
            console.warn('Full name not found in response');
          }
        
          // const parsed = typeof response === 'string' ? JSON.parse(response) : response;
          // localStorage.setItem('fullName', response.fullName);


          // Show success for 2 seconds, then redirect
          setTimeout(() => {
            this.router.navigate(['/userdashboard']);
          }, 2000);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
}