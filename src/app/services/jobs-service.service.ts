import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsServiceService {
  private baseUrl = 'http://localhost:5174';
  constructor(private http: HttpClient) {}

  addJob(job: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Recruiter/addjob`, job);
  }

  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/Recruiter/deletejob?jobId=${jobId}`);
  }
  
  getJobsByRecruiter(recruiterId: number): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/api/Recruiter/getjobbyrecruiter?recruiterId=${recruiterId}`);
  }
}
