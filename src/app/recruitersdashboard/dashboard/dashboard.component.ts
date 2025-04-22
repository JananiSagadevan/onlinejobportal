import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecNavbarComponent } from '../rec-navbar/rec-navbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [RecNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('recruiterToken'); // Clear session data
    this.router.navigate(['/recruiter/login']); // Redirect to login
  }

}
