import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { JobsServiceService } from '../../services/jobs-service.service';
import { JobSeekerProfile, UserServiceService } from '../../services/user-service.service';
import { ApplyJobPopupComponent } from '../apply-job-popup/apply-job-popup.component';

interface Job {
  jobId: number;
  recruiterId: number;
  jobTitle: string;
  companyName: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string;
  postedDate: string;
  applicationDeadline: string;
  applied: boolean;
}


@Component({
  selector: 'app-applyjobs',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, UserNavbarComponent,ApplyJobPopupComponent],
  templateUrl: './applyjobs.component.html',
  styleUrls: ['./applyjobs.component.css']
})
export class ApplyjobsComponent implements OnInit {

  applyForm: FormGroup;
  isSubmitting = false;
  selectedResume: File | null = null;
  selectedProfilePicture: File | null = null;
  showPopup = false;
  currentApplicationData: any = null;

  user: JobSeekerProfile = {
      jobSeekerId: 0, // Replace with actual logged-in user ID
      dateOfBirth: '',
      gender: '',
      address: '',
      education: '',
      experience: '',
      skills: '',
      profilePhoto: '',
      cv: ''
    };
  jobs: any[] = []; // Assume you fetch jobs
  filteredJobs: any[] = [];
  loading = false;

  searchKeyword = '';
  selectedLocation = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private jobservice:JobsServiceService,
    private jobSeekerService: UserServiceService
    
  ) {
    this.applyForm = this.fb.group({
      jobId: ['', Validators.required],
      jobSeekerId: ['', Validators.required],
      coverLetter: [''],
      education: [''],
      experience: [''],
      skills: [''],
      profileSummary: [''],
      mobile: ['', Validators.required],
      gender: [''],
      dateOfBirth: ['']
    });
  }

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    this.http.get<any>('http://localhost:5174/api/User/GetAllJobs').subscribe({
      next: (response) => {
        this.jobs = response.jobs.map((job: Job) => ({ ...job, applied: false }));
        this.filteredJobs = [...this.jobs];
        this.loading = false;
      },
      error: (error) => {
       alert("Failed to load jobs: " + (error.error?.message || 'Server error'));
        this.loading = false;
      }
    });
  }

  filterJobs() {
    this.filteredJobs = this.jobs.filter(job =>
      job.jobTitle.toLowerCase().includes(this.searchKeyword.toLowerCase()) &&
      (this.selectedLocation ? job.location === this.selectedLocation : true)
    );
  }

  uniqueLocations() {
    return [...new Set(this.jobs.map(job => job.location))];
  }

  // applyJob(job: any) {
  //   const applicationData = {
  //     applicationId: 0, // New application
  //     jobId: job.jobId,
  //     jobSeekerId: Number(localStorage.getItem('jobSeekerId')), // Replace with actual logged-in user's ID
  //     coverLetter: 'I am excited to apply for this position because it aligns with my skills and career goals.',
  //     education: 'B.Tech in Computer Science',
  //     experience: '2 years as Frontend Developer at ABC Corp',
  //     skills: 'Angular, TypeScript, HTML, CSS',
  //     profileSummary: 'A highly motivated developer with a passion for building user-friendly web applications.',
  //     mobile: '9876543210',
  //     gender: 'Female',
  //     dateOfBirth: '1999-05-20T00:00:00.000Z', // Ensure ISO format
  //     currentStatus: 'Pending',
  //     resumeUrl: 'https://example.com/dummy-resume.pdf',
  //     profilePictureUrl: 'https://example.com/profile-picture.jpg',
  //     appliedDate: new Date().toISOString() // Current timestamp in ISO format
  //   };
    
  //     this.jobSeekerService.getProfile(Number(localStorage.getItem('jobSeekerId'))).subscribe(response => {
  //       if (response.profile) {
  //         this.user = response.profile;
  //         console.log(this.user);
  //       }
  //     });
    
    
  //   console.log(applicationData);
  //   this.jobservice.applyForJob(applicationData).subscribe({
  //     next: (response: any) => {
  //       job.applied = true;
  //       alert("Application submitted successfully.");
  //     },
  //     error: (err) => {
  //       alert("Failed to apply: " + (err.error?.message || 'Server error'));
  //     }
  //   });
  // }
  applyJob(job: any) {
    const jobSeekerId = Number(localStorage.getItem('jobSeekerId'));
  
    this.jobSeekerService.getProfile(jobSeekerId).subscribe({
      next: (response) => {
        if (response.profile) {
          this.user = response.profile;
  
          this.currentApplicationData = {
            applicationId: 0,
            jobId: job.jobId,
            jobSeekerId: jobSeekerId,
            coverLetter: 'I am excited to apply for this position...',
            education: this.user.education,
            experience: this.user.experience,
            skills: this.user.skills,
            profileSummary: 'A motivated developer...',
            mobile: '9876543210',
            gender: this.user.gender,
            dateOfBirth: new Date(this.user.dateOfBirth).toISOString(),
            currentStatus: 'Pending',
            resumeUrl: `https://your-server.com/uploads/${this.user.cv}`,
            profilePictureUrl: this.user.profilePhoto,
            appliedDate: new Date().toISOString()
          };
  
          this.showPopup = true; // Show modal
        }
      }
    });
  }
  onPopupSubmit(data: any) {
    this.jobservice.applyForJob(data).subscribe({
      next: (response) => {
        const jobIndex = this.jobs.findIndex(j => j.jobId === data.jobId);
        if (jobIndex !== -1) this.jobs[jobIndex].applied = true;
        alert("Application submitted successfully.");
        this.showPopup = false;
      },
      error: (err) => {
        alert("Failed to apply: " + (err.error?.message || 'Server error'));
      }
    });
  }
  
  onPopupClose() {
    this.showPopup = false;
  }
  
  
  
  

}