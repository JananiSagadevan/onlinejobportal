import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-userprofile',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,UserNavbarComponent],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  user = {
    name: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    education: '',
    experience: '',
    skills: '',
    profilePhoto: '', // Add profile photo URL or path here
    cv: '', // Add CV URL or path here
  };
  selectedProfilePic: File | null = null;
  selectedResume: File | null = null;
  saved: boolean = false;
  editMode: boolean = false;
  jobSeekerId: number = 1; // You can dynamically assign the jobSeekerId here based on the logged-in user

  constructor(private userService: UserServiceService, private http: HttpClient) {}

  ngOnInit() {
    this.getUserProfile();
  }

  // Fetch the profile details using getProfile method
  getUserProfile() {
    this.userService.getProfile(this.jobSeekerId).subscribe((profile) => {
      if (profile) {
        this.user = profile;
      }
    });
  }

  // Toggle the edit mode to enable/disable profile editing
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  // Handle the change event for profile picture
  onProfilePicChange(event: any) {
    this.selectedProfilePic = event.target.files[0];
  }

  // Handle the change event for resume file
  onResumeChange(event: any) {
    this.selectedResume = event.target.files[0];
  }

  // Save the profile by calling updateProfile method
  saveProfile() {
    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('gender', this.user.gender);
    formData.append('dateOfBirth', this.user.dateOfBirth);
    formData.append('education', this.user.education);
    formData.append('experience', this.user.experience);
    formData.append('skills', this.user.skills);

    if (this.selectedProfilePic) {
      formData.append('profilePhoto', this.selectedProfilePic, this.selectedProfilePic.name);
    }
    if (this.selectedResume) {
      formData.append('cv', this.selectedResume, this.selectedResume.name);
    }

    // Call the updateProfile method to update the user profile
    this.userService.updateProfile(this.jobSeekerId, formData).subscribe(
      (response) => {
        this.saved = true;
        this.toggleEditMode();
      },
      (error) => {
        console.error('Error saving profile:', error);
      }
    );
  }
}