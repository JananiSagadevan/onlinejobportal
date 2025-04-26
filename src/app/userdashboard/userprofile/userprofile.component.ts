import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { HttpClient } from '@angular/common/http';
import { JobSeekerProfile, UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-userprofile',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, UserNavbarComponent],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  user: JobSeekerProfile = {
    jobSeekerId: 1, // Replace with actual logged-in user ID
    dateOfBirth: '',
    gender: '',
    address: '',
    education: '',
    experience: '',
    skills: '',
    profilePhoto: '',
    cv: ''
  };
  isEditMode = false;
  message = '';
  selectedResume: string = '';
  saved = false;

  constructor(private jobSeekerService: UserServiceService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.jobSeekerService.getProfile(this.user.jobSeekerId).subscribe(response => {
      if (response.profile) {
        this.user = response.profile;
      }
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.jobSeekerService.updateProfile(this.user.jobSeekerId, this.user).subscribe(response => {
        this.message = response.message;
        this.isEditMode = false; // Return to view mode
        this.saved = true; // Show success message
      });
    } else {
      this.jobSeekerService.createProfile(this.user).subscribe(response => {
        this.message = response.message;
        this.isEditMode = false;
        this.saved = true;
      });
    }
  }

  onProfilePicChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Update profile photo URL or handle file upload as per your requirement
      this.user.profilePhoto = URL.createObjectURL(file); // For demo purposes
    }
  }

  onResumeChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedResume = file.name;
    }
  }

  saveProfile(): void {
    this.onSubmit();
  }
}
