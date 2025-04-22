import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';

@Component({
  selector: 'app-appliedjobs',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,UserNavbarComponent],
  templateUrl: './appliedjobs.component.html',
  styleUrl: './appliedjobs.component.css'
})
export class AppliedjobsComponent {
  appliedJobs = [
    { title: "Software Engineer", company: "Google", salary: 80000, location: "Bangalore", status: "Applied" },
    { title: "Data Analyst", company: "Microsoft", salary: 70000, location: "Hyderabad", status: "Pending" },
    { title: "Frontend Developer", company: "Amazon", salary: 75000, location: "Chennai", status: "Interview Shortlisted" },
    { title: "Backend Developer", company: "Facebook", salary: 85000, location: "Pune", status: "Rejected" },
    { title: "AI Engineer", company: "Tesla", salary: 90000, location: "Delhi", status: "Selected" }
  ];

  getProgressClass(status: string): string {
    switch (status) {
      case "Applied": return "bg-info";
      case "Pending": return "bg-warning";
      case "Interview Shortlisted": return "bg-primary";
      case "Rejected": return "bg-danger";
      case "Selected": return "bg-success";
      default: return "bg-secondary";
    }
  }

  getProgressWidth(status: string): string {
    switch (status) {
      case "Applied": return "20%";
      case "Pending": return "40%";
      case "Interview Shortlisted": return "60%";
      case "Rejected": return "100%";
      case "Selected": return "100%";
      default: return "0%";
    }
  }

}
