import { Component, OnInit } from '@angular/core';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
export interface UserDashboardStats {
  totalJobs: number;
  activeJobs: number;
  appliedJobs: number;
  interviewScheduled: number;
}
@Component({
  standalone: true,
  selector: 'app-udashboard',
  imports: [UserNavbarComponent,CommonModule],
  templateUrl: './udashboard.component.html',
  styleUrl: './udashboard.component.css'
})



export class UdashboardComponent implements OnInit {
  stats: UserDashboardStats | null = null;
  jobSeekerId = 2008; 
  fullName: string = '';
  constructor(private dashboardService: UserServiceService) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('fullName');
    console.log('>>> Retrieved from localStorage:', storedName);
  
    this.fullName = storedName || 'JobSeeker';

    this.dashboardService.getDashboardStats(this.jobSeekerId).subscribe({
      next: (data) => {this.stats = data;
        console.log(this.stats)
      console.log(this.stats?.interviewScheduled ?? 0)},
      error: (err) => console.error('Error fetching dashboard stats:', err)
    });
  }

}
