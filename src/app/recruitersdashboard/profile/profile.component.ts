import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RecNavbarComponent } from '../rec-navbar/rec-navbar.component';
import { RecruiterProfileService } from '../../services/recruiter-profile.service';
@Component({
  selector: 'app-profile',
  imports: [FormsModule,CommonModule,RecNavbarComponent,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  recruiter = {
    companyName: " ",
    location: " ",
    recruiterName: " ",
    email: " ",
    contact: " ",
    Designation: " ",
    AboutCompany: " ",
    Description:" "
  }; /*companyName: " ",
  // recruiterName: "",
  // email: " ",
  // contact: " ",
  // Designation:"", 
  // location: " ",
  // Aboutcompany: " "*/

  // editMode = false;
  saved = false;

  // toggleEditMode() {
  //   this.editMode = !this.editMode;
  // }

  // saveProfile() {
  //   this.saved = true;
  //   this.editMode = false;

  //   // Simulate API call to save data
  //   setTimeout(() => {
  //     this.saved = false;
  //   }, 3000);
  // }
  profileForm!: FormGroup;
  editMode = false;
  recruiterId = 1; // Get this dynamically from login/localStorage in real use

  constructor(private fb: FormBuilder, private profileService: RecruiterProfileService) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      companyName: [''],
      location: [''],
      recruiterName: [''],
      email: [''],
      contact: [''],
      designation: [''],
      aboutCompany: [''],
      description: ['']
    });

    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile(this.recruiterId).subscribe({
      next: (res) => {
        this.profileForm.patchValue(res.data);
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      }
    });
  }

  saveProfile() {
    if (this.editMode) {
      this.profileService.updateProfile(this.recruiterId, this.profileForm.value).subscribe({
        next: () => {
          alert('Profile updated!');
          this.editMode = false;
        },
        error: (err) => {
          console.error('Update failed:', err);
        }
      });
    } else {
      this.profileService.createProfile(this.profileForm.value).subscribe({
        next: () => {
          alert('Profile created!');
          this.editMode = false;
        },
        error: (err) => {
          console.error('Create failed:', err);
        }
      });
    }
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

}
