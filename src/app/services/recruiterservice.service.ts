import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecruiterserviceService {
  private baseUrl = 'http://localhost:5174'; // Adjust if needed

  constructor(private http: HttpClient) { }
  getRecruiterDashboardStats(recruiterId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Recruiter/recruiter/${recruiterId}`);
  }
  getApplicationStatusCounts(recruiterId: number)  {
    return this.http.get<any[]>(`${this.baseUrl}/api/Recruiter/dashboard/status-counts/{recruiterId}${recruiterId}`);
  }
  
  
}
