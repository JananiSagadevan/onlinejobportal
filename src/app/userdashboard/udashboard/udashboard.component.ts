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
// export class UdashboardComponent {
//   totaljobs = 25;
//   testsTaken = 3;
//   jobsAvailable = 12;
//   shortlistedJobs = 4;

//   activeTab = 'profile';

//   navigate(tab: string) {
//     this.activeTab = tab;
//   }

//   logout() {
//     alert('Logging out...');
//     // Implement logout logic (e.g., clearing session storage)
//   }

// }


export class UdashboardComponent implements OnInit {
  stats: UserDashboardStats | null = null;
  jobSeekerId = 2008; // Replace with dynamic ID if needed
  fullName: string = '';
  constructor(private dashboardService: UserServiceService) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('fullName');
    console.log('>>> Retrieved from localStorage:', storedName);
  
    this.fullName = storedName || 'JobSeeker';
    // console.log('Retrieved name:', this.fullName);
    // this.fullName = localStorage.getItem('fullName') || 'JobSeeker';
    

    this.dashboardService.getDashboardStats(this.jobSeekerId).subscribe({
      next: (data) => {this.stats = data;
        console.log(this.stats)
      console.log(this.stats?.interviewScheduled ?? 0)},
      error: (err) => console.error('Error fetching dashboard stats:', err)
    });
  }

}
