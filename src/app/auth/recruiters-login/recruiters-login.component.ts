import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomenavbarComponent } from '../homenavbar/homenavbar.component';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-recruiters-login',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,HomenavbarComponent],
  templateUrl: './recruiters-login.component.html',
  styleUrl: './recruiters-login.component.css'
})
export class RecruitersLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

//   login() {
//     if (this.loginForm.invalid) {
//       this.errorMessage = 'Please fill out all fields correctly.';
//       return;
//     }

//     const { email, password } = this.loginForm.value;

//     this.authService.loginRecruiter(email, password).subscribe({
//       next: (res) => {
        
//         if (res?.success) {
//           this.errorMessage = '';
//           console.log(res);
//           localStorage.setItem("recruiterId",res.data.recruiterId);
//         localStorage.setItem("loggedRecruiter",res.data);
//         console.log(localStorage.getItem("recruiterId"));
//         console.log(res);
//           alert('Login Successful');
//           this.router.navigate(['/dashboard']); // adjust route
//         } else {
//           this.errorMessage = res.message || 'Login failed';
//         }
//       },
//       error: (err) => {
//         this.errorMessage = err?.error?.message || 'Server error. Please try again.';
//       }
//     });
//   }
// }
login() {
  this.errorMessage = '';
  this.successMessage = '';

  if (this.loginForm.invalid) {
    this.errorMessage = 'Please fill out all fields correctly.';
    return;
  }

  const { email, password } = this.loginForm.value;

  this.authService.loginRecruiter(email, password).subscribe({
    next: (res) => {
      if (res?.success) {
        this.successMessage = 'Login Successful!';
        this.errorMessage = '';
        localStorage.setItem("recruiterId", res.data.recruiterId);
        localStorage.setItem("loggedRecruiter", JSON.stringify(res.data));

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500); // Navigate after showing success
      } else {
        this.errorMessage = res.message || 'Login failed';
        this.successMessage = '';
      }
    },
    error: (err) => {
      this.errorMessage = err?.error?.message || 'Server error. Please try again.';
      this.successMessage = '';
    }
  });
}
}
