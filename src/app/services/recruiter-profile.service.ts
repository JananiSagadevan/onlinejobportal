import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterProfileService {

  private baseUrl = 'http://localhost:5174'; // Replace with your actual base URL

  constructor(private http: HttpClient) {}

  createProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Recruiter/createprofile`, profileData);
  }

  getProfile(recruiterId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Recruiter/getprofile`);
  }

  updateProfile(recruiterId: number, profileData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/Recruiter/updateprofile`, profileData);
  }
}
