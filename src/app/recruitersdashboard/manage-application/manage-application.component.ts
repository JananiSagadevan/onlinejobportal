import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecNavbarComponent } from '../rec-navbar/rec-navbar.component';

@Component({
  selector: 'app-manage-application',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RecNavbarComponent],
  templateUrl: './manage-application.component.html',
  styleUrl: './manage-application.component.css'
})
export class ManageApplicationComponent {
  applications = [
    { id: 1, name: 'Alice Johnson', jobTitle: 'Software Engineer', status: 'Pending', email: 'alice@example.com', resume: 'resume-alice.pdf' },
    { id: 2, name: 'John Doe', jobTitle: 'Data Analyst', status: 'Interview Scheduled', email: 'john@example.com', resume: 'resume-john.pdf' },
    { id: 3, name: 'Emily Brown', jobTitle: 'Frontend Developer', status: 'Shortlisted', email: 'emily@example.com', resume: 'resume-emily.pdf' }
  ];

  searchText = '';
  selectedStatus = '';
  selectedApplicant: any = null;
  interviewDate: string = '';

  // Filter applications by search term or status
  get filteredApplications() {
    return this.applications.filter(app =>
      (app.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(this.searchText.toLowerCase())) &&
      (this.selectedStatus === '' || app.status === this.selectedStatus)
    );
  }

  // Open Modal to View Applicant Details
  viewApplicant(applicant: any) {
    this.selectedApplicant = applicant;
  }

  // Update Application Status
  updateStatus(applicant: any, newStatus: string) {
    applicant.status = newStatus;
  }

  // Schedule Interview
  scheduleInterview() {
    if (this.selectedApplicant) {
      this.selectedApplicant.status = 'Interview Scheduled';
      alert(`Interview scheduled with ${this.selectedApplicant.name} on ${this.interviewDate}`);
      this.interviewDate = '';
    }
  }
}
