import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';

@Component({
  selector: 'app-userprofile',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,UserNavbarComponent],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  user = {
    profilePic: "",
    name: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    qualification: "",
    skills: "",
  };

  editMode = false;
  saved = false;
  selectedResume: string = '';

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onProfilePicChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.user.profilePic = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onResumeChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedResume = file.name;
    }
  }

  saveProfile() {
    this.saved = true;
    this.editMode = false;

    // Simulate API call to save data
    setTimeout(() => {
      this.saved = false;
    }, 3000);
  }
}
