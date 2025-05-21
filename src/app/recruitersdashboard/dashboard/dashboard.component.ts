import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecNavbarComponent } from '../rec-navbar/rec-navbar.component';
import { RecruiterProfileService } from '../../services/recruiter-profile.service';
import { RecruiterserviceService } from '../../services/recruiterservice.service';

import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';


export interface RecruiterDashboardStats {
  totalJobs: number;
  activeJobs: number;
  pendingApplications: number;
  applicationsreceived: number;
}
export interface ApplicationStatusCount {
  currentStatus: string;
  statusCount: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RecNavbarComponent,NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats: RecruiterDashboardStats | null = null;
  recruiterId: number = 0;
  recruiterName = 'Recruiter'; 
 

  
  constructor(private RecruiterserviceService: RecruiterserviceService) {}

  ngOnInit(): void {
    const recruiterIdFromStorage = localStorage.getItem('recruiterId');
    if (recruiterIdFromStorage) {
      this.recruiterId = parseInt(recruiterIdFromStorage, 10);
      this.loadRecruiterDashboardStats();
      
    } else {
      console.error('Recruiter ID not found in localStorage.');
    }
  }

  loadRecruiterDashboardStats(): void {
    this.RecruiterserviceService.getRecruiterDashboardStats(this.recruiterId).subscribe({
      next: (data: RecruiterDashboardStats) => {
        this.stats = data;
        console.log('Recruiter Dashboard Stats:', this.stats);
        this.RecruiterserviceService.getApplicationStatusCounts(this.recruiterId)
      .subscribe((response: ApplicationStatusCount[]) => {
        const labels = response.map(item => item.currentStatus);
        const data = response.map(item => item.statusCount);

        
      });
      },
      error: (err: any) => {
        console.error('Error fetching recruiter dashboard stats:', err);
      }
    });
  }

}
