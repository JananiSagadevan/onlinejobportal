import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecNavbarComponent } from '../rec-navbar/rec-navbar.component';
import { JobsServiceService } from '../../services/jobs-service.service';

@Component({
  selector: 'app-manage-application',
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RecNavbarComponent],
  templateUrl: './manage-application.component.html',
  styleUrl: './manage-application.component.css'
})
export class ManageApplicationComponent implements OnInit {
  jobs: any[] = [];
  applicants: any[] = [];
  recruiterId: number = 0;
  selectedJobId: number | null = null;
  showModal: boolean = false;
  errorMessage: string = '';

  constructor(
    private recruiterService: JobsServiceService,
    private applicationService: JobsServiceService
  ) {}

  ngOnInit(): void {
      this.recruiterId =Number(localStorage.getItem('recruiterId'));
      this.loadJobs();
    
  }

  loadJobs(): void {
    this.recruiterService.getJobsByRecruiter(this.recruiterId).subscribe({
      next: (res : any) => {
        if (res.status === 'success') this.jobs = res.data;
        else this.errorMessage = res.message;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to fetch jobs.';
      }
    });
  }

  openApplicantModal(jobId: number): void {
    this.selectedJobId = jobId;
    this.showModal = true;

    this.applicationService.getApplicantsByJob(jobId).subscribe({
      next: (res) => {
        this.applicants = res;
        this.applicants.forEach((app: any) => {
          app.updatedStatus = app.currentStatus;
        });
      },
      error: (err) => {
        console.error(err);
        this.applicants = [];
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedJobId = null;
    this.applicants = [];
  }

  updateStatus(applicant: any): void {
    const payload = {
      applicationId: applicant.applicationId,
      currentStatus: applicant.updatedStatus
    };
    console.log(payload);
    this.applicationService.updateApplicationStatus(payload).subscribe({
      next: (res) => {
        applicant.currentStatus = payload.currentStatus;
        alert('Status updated successfully');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update status');
      }
    });
  }
}
