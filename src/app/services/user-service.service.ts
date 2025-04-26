import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface JobSeekerProfile {
  profileId?: number;
  jobSeekerId: number;
  dateOfBirth: string;
  gender?: string;
  address?: string;
  education?: string;
  experience?: string;
  skills?: string;
  profilePhoto?: string;
  cv?: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:5174/api/User'; // Adjust as needed

  constructor(private http: HttpClient) {}

  createProfile(profile: JobSeekerProfile): Observable<any> {
    return this.http.post(`${this.baseUrl}/createprofile`, profile);
  }

  getProfile(jobSeekerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetProfile?jobSeekerId=${jobSeekerId}`);
  }

  updateProfile(jobSeekerId: number, profile: JobSeekerProfile): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateProfile?jobSeekerId=${jobSeekerId}`, profile);
  }
}
