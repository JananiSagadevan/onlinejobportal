import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomenavbarComponent } from '../homenavbar/homenavbar.component';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-recruiters-register',
  imports: [CommonModule, FormsModule,ReactiveFormsModule,HomenavbarComponent],
  templateUrl: './recruiters-register.component.html',
  styleUrl: './recruiters-register.component.css'
})
export class RecruitersRegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      Name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      companyName: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = "Please fill all fields correctly.";
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    const recruiterData = {
      name: this.registerForm.value.Name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      companyName: this.registerForm.value.companyName
    };

    this.isSubmitting = true;

    this.authService.registerRecruiter(recruiterData).subscribe({
      next: (response: any) => {
        this.successMessage = "Registration successful!";
        this.errorMessage = "";
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Registration failed. Try again.';
        this.successMessage = "";
        this.isSubmitting = false;
      }
    });
  }

}
