import { Component } from '@angular/core';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';

@Component({
  selector: 'app-udashboard',
  imports: [UserNavbarComponent],
  templateUrl: './udashboard.component.html',
  styleUrl: './udashboard.component.css'
})
export class UdashboardComponent {
  totaljobs = 25;
  testsTaken = 3;
  jobsAvailable = 12;
  shortlistedJobs = 4;

  activeTab = 'profile';

  navigate(tab: string) {
    this.activeTab = tab;
  }

  logout() {
    alert('Logging out...');
    // Implement logout logic (e.g., clearing session storage)
  }

}
