import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecNavbarComponent } from '../rec-navbar/rec-navbar.component';
import { JobsServiceService } from '../../services/jobs-service.service';
@Component({
  selector: 'app-postjobs',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RecNavbarComponent],
  templateUrl: './postjobs.component.html',
  styleUrl: './postjobs.component.css'
})
export class PostjobsComponent implements OnInit {
  jobForm!: FormGroup;
  jobs: any[] = [];
  errorMessage: string = '';
  isEditing = false;
  selectedJobId: number | null = null;

  recruiterId = Number(localStorage.getItem('recruiterId')); 

  constructor(
    private fb: FormBuilder,
    private jobService: JobsServiceService
  ) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      location: ['', Validators.required],
      employmentType: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      applicationDeadline: ['', Validators.required]
    });

    this.loadJobs();
  }

  addJob(): void {
    if (this.jobForm.invalid) return;

    const jobPayload = {
      recruiterId: this.recruiterId,
      ...this.jobForm.value
    };

    this.jobService.addJob(jobPayload).subscribe({
      next: (res) => {
        alert('Job posted successfully!');
        this.jobForm.reset();
        this.loadJobs();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to post job.');
      }
    });
  }

  loadJobs(): void {
    this.jobService.getJobsByRecruiter(this.recruiterId).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.jobs = response.data;
        } else {
          this.errorMessage = response.message || 'Failed to load jobs.';
        }
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'An error occurred while fetching jobs.';
      }
    });
  }

  deleteJob(jobId: number): void {
    if (!confirm('Are you sure you want to delete this job?')) return;

    this.jobService.deleteJob(jobId).subscribe({
      next: () => {
        alert('Job deleted successfully.');
        this.loadJobs();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete job.');
      }
    });
  }

  editJob(index: number): void {
    const job = this.jobs[index];
    this.isEditing = true;
    this.selectedJobId = job.jobId;

    this.jobForm.patchValue({
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      location: job.location,
      employmentType: job.employmentType,
      description: job.description,
      requirements: job.requirements,
      applicationDeadline: job.applicationDeadline
    });


  }
}