import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RecNavbarComponent } from '../rec-navbar/rec-navbar.component';
import { RecruiterProfile, RecruiterProfileService } from '../../services/recruiter-profile.service';
@Component({
  selector: 'app-profile',
  imports: [FormsModule,CommonModule,RecNavbarComponent,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  recruiter: RecruiterProfile = {
    recruiterId: 0, // You can assign from auth service or localStorage
    companyName: '',
    recruiterName: '',
    email: '',
    contact: '',
    designation: '',
    location: '',
    aboutCompany: ''
  };

  editMode = false;
  saved = false;

  constructor(private profileService: RecruiterProfileService) {}

  ngOnInit(): void {
    const storedRecruiterId = Number(localStorage.getItem('recruiterId'));
    if (storedRecruiterId) {
      this.recruiter.recruiterId = +storedRecruiterId;
      this.loadProfile();
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.saved = false;
  }

  loadProfile() {
    this.profileService.getProfile(this.recruiter.recruiterId).subscribe({
      next: (data) => {
        this.recruiter = data;
        console.log('Profile loaded', this.recruiter);
      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }

  saveProfile() {
    this.profileService.updateProfile(this.recruiter).subscribe({
      next: () => {
        this.saved = true;
        this.editMode = false;
      },
      error: (err) => {
        console.error('Failed to update profile', err);
      }
    });
  }
}