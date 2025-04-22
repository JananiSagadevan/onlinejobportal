import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';

@Component({
  selector: 'app-applyjobs',
  imports: [ReactiveFormsModule,CommonModule,FormsModule, UserNavbarComponent],
  templateUrl: './applyjobs.component.html',
  styleUrl: './applyjobs.component.css'
})
export class ApplyjobsComponent {
  jobs = [
    { title: "Software Engineer", company: "Google", description: "Develop,Design,test and maintains a software application by applying engineering principles and programming language knowledge to create a functional and efficient solution that meet user need.", salary: 80000, location: "Bangalore", type: "Full-time", applied: false },
    { title: "Data Analyst", company: "Microsoft", description: "Analyze data trends.", salary: 70000, location: "Hyderabad", type: "Remote", applied: false },
    { title: "Frontend Developer", company: "Amazon", description: "Build UI components.", salary: 75000, location: "Chennai", type: "Part-time", applied: false }
  ];
  
  filteredJobs = [...this.jobs];
  searchKeyword = '';
  selectedLocation = '';

  filterJobs() {
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) &&
      (this.selectedLocation ? job.location === this.selectedLocation : true)
    );
  }

  uniqueLocations() {
    return [...new Set(this.jobs.map(job => job.location))];
  }

  applyJob(job: any) {
    job.applied = true;
    alert(`Applied for ${job.title} at ${job.company}`);
  }
}
