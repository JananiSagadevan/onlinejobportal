import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecruiterProfile {
  profileId?: number;
  recruiterId: number;
  companyName: string;
  recruiterName: string;
  email: string;
  contact: string;
  designation: string;
  location: string;
  aboutCompany: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecruiterProfileService {
  private baseUrl = 'http://localhost:5174/api/recruiter'; // Adjust if needed

  constructor(private http: HttpClient) {}

  createProfile(profile: RecruiterProfile): Observable<any> {
    return this.http.post(`${this.baseUrl}/createprofile`, profile);
  }

  getProfile(recruiterId: number): Observable<RecruiterProfile> {
    return this.http.get<RecruiterProfile>(`${this.baseUrl}/getprofile?recruiterId=${recruiterId}`);
  }

  updateProfile(profile: RecruiterProfile): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateprofile`, profile);
  }
}
