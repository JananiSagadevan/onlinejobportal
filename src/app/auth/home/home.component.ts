import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
    title = 'job_portal';
    scrollToAbout() {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }

}
