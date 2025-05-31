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
    jobSeekerId: 0, 
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
  jobSeeker: any;
  constructor(private jobSeekerService: UserServiceService) {}

  ngOnInit(): void {
    this.user.jobSeekerId +=Number(localStorage.getItem('jobSeekerId'));
    console.log(this.user.jobSeekerId);
    this.getProfile();
    const userIn = localStorage.getItem('user');
    console.log(userIn)
  if (userIn) {
    this.jobSeeker = JSON.parse(userIn); 
    console.log(this.jobSeeker);
  }
  }
  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreviewUrl = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }


  // uploadFile(): void {
  //   this.statusMessage = '';
  //   this.extractedText = '';
  //   if (!this.userId) {
  //     this.statusMessage = 'User ID is missing.';
  //     return;
  //   }
  //   if (!this.selectedFile) {
  //     this.statusMessage = 'Please select a file.';
  //     return;
  //   }

  //   this.ocrService.uploadImage(this.selectedFile).subscribe({
  //     next: (res) => {
  //       console.log('Upload Success:', res)
  //       this.statusMessage = 'Upload successful!';
  //       this.getExtractedText();
  //     },
  //     error: (err) => {
  //       console.error("Upload failed:", err); // Full backend error
  //       this.statusMessage = err?.errorr?.message || 'Upload failed. Server error.';
  //     }
  //   });
  // }

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
        this.isEditMode = false; 
        this.saved = true; 
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

  // onResumeChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedResume = file.name;
  //   }
  // }
  cvFile: File | null = null; // Add this to your component

onResumeChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedResume = file.name;
    this.cvFile = file; // Store actual file
  }
}

// saveProfile(): void {
//   if (this.cvFile) {
//     const formData = new FormData();
//     formData.append('jobSeekerId', this.user.jobSeekerId.toString());
//     formData.append('dateOfBirth', this.user.dateOfBirth);
//     formData.append('gender', this.user.gender || '');
//     formData.append('address', this.user.address || '');
//     formData.append('education', this.user.education || '');
//     formData.append('experience', this.user.experience || '');
//     formData.append('skills', this.user.skills || '');
//     formData.append('cv', this.cvFile); // actual file

//     this.jobSeekerService.uploadProfileWithCV(formData).subscribe(response => {
//       this.message = response.message;
//       this.saved = true;
//       this.isEditMode = false;
//     });
//   } else {
//     this.onSubmit(); // fallback if no file is selected
//   }
// }

  saveProfile(): void {
    this.onSubmit();
  }
}
