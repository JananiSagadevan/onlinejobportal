import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';

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
  imports: [ReactiveFormsModule, CommonModule, FormsModule, UserNavbarComponent],
  templateUrl: './applyjobs.component.html',
  styleUrls: ['./applyjobs.component.css']
})
export class ApplyjobsComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchKeyword: string = '';
  selectedLocation: string = '';
  message: string = '';
  loading: boolean = true;

  selectedJob: Job | null = null;

  resumeFile: File | null = null;
  profilePictureFile: File | null = null;

  // Form object bound via ngModel
  applicationForm: any = {
    jobId: null,
    resumeUrl: '',
    coverLetter: '',
    education: '',
    experience: '',
    skills: '',
    profileSummary: '',
    mobile: '',
    gender: '',
    dateOfBirth: ''
  };

  constructor(private http: HttpClient) {}

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
        this.message = "Failed to load jobs: " + (error.error?.message || 'Server error');
        this.loading = false;
      }
    });
  }

  filterJobs() {
    this.filteredJobs = this.jobs.filter(job =>
      job.jobTitle.toLowerCase().includes(this.searchKeyword.toLowerCase()) &&
      (this.selectedLocation === '' || job.location === this.selectedLocation)
    );
  }

  uniqueLocations(): string[] {
    const locations = this.jobs.map(job => job.location).filter(loc => !!loc);
    return [...new Set(locations)];
  }

  applyJob(job: Job) {
    this.selectedJob = job;
    this.applicationForm = {
      jobId: job.jobId,
      resumeUrl: '',
      coverLetter: '',
      education: '',
      experience: '',
      skills: '',
      profileSummary: '',
      mobile: '',
      gender: '',
      dateOfBirth: ''
    };

    // Open modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('applyModal'));
    modal.show();
  }

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (type === 'resume') this.resumeFile = file;
    if (type === 'profilePicture') this.profilePictureFile = file;
  }

  submitApplication() {
    console.log(this.selectedJob);
    

    const formData = new FormData();
    formData.append('jobId', this.applicationForm.jobId);
    formData.append('jobSeekerId', '1'); // Replace with actual user ID
    formData.append('resume', '');
    formData.append('coverLetter', this.applicationForm.coverLetter);
    formData.append('education', this.applicationForm.education);
    formData.append('experience', this.applicationForm.experience);
    formData.append('skills', this.applicationForm.skills);
    formData.append('profileSummary', this.applicationForm.profileSummary);
    formData.append('mobile', this.applicationForm.mobile);
    formData.append('gender', this.applicationForm.gender);
    formData.append('dateOfBirth', this.applicationForm.dateOfBirth);
    if (this.profilePictureFile) {
      formData.append('profilePicture', this.profilePictureFile);
    }
    console.log('FormData:', formData); 
    // Debugging line
    this.http.post('http://localhost:5174/api/User/applyjobs', formData).subscribe({
      next: () => {
        this.selectedJob!.applied = true;
        this.closePopup();
      },
      error: (err) => {
        console.error('Application failed', err);
      }
    });
  }

  closePopup() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('applyModal'));
    modal.hide();

    this.selectedJob = null;
    this.resumeFile = null;
    this.profilePictureFile = null;
    this.applicationForm = {
      jobId: null,
      resumeUrl: '',
      coverLetter: '',
      education: '',
      experience: '',
      skills: '',
      profileSummary: '',
      mobile: '',
      gender: '',
      dateOfBirth: ''
    };
  }
}
