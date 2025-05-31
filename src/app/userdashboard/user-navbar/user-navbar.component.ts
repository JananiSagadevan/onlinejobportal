
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  imports: [ RouterModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent implements OnInit {
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen for route changes and update currentRoute accordingly
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  navigateLogout() {
    const confirmed = confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear(); // Clear login/session data
    // Clear user session, tokens, or any cleanup here
    this.router.navigate(['/']);
  }
}
}