import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { AppliedJob, UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-appliedjobs',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,UserNavbarComponent],
  templateUrl: './appliedjobs.component.html',
  styleUrl: './appliedjobs.component.css'
})
export class AppliedjobsComponent implements OnInit {
  appliedJobs: AppliedJob[] = [];
  jobSeekerId = 2008; 

  constructor(private jobAppService: UserServiceService) {}

  ngOnInit(): void {
    this.jobAppService.getApplicationsByJobSeeker(this.jobSeekerId).subscribe({
      next: (data) => {
        
        this.appliedJobs = data.map((item: any) => ({
          application: item.application,
          job: item.job.job  
        }));
        console.log(this.appliedJobs);
      },
      error: (err) => console.error('Error loading applied jobs', err)
    });
  }
  getProgressClass(status: string): string {
    switch (status) {
      case "Reviewed": return "bg-info";
      case "Pending": return "bg-warning";
      case "Interview Scheduled": return "bg-primary";
      case "Rejected": return "bg-danger";
      case "Selected": return "bg-success";
      default: return "bg-secondary";
    }
  }

  getProgressWidth(status: string): string {
    switch (status) {
      case "Reviewed": return "40%";
      case "Pending": return "20%";
      case "Interview Scheduled": return "60%";
      case "Rejected": return "100%";
      case "Selected": return "100%";
      default: return "0%";
    }
  }
  
}

  


