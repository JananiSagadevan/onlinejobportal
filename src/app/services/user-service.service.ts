import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'https://localhost:5001/api/jobseeker'; // Adjust your base URL

  constructor(private http: HttpClient) {}

  createProfile(profile: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createprofile`, profile);
  }

  getProfile(jobSeekerId: number): Observable<any> {
    let params = new HttpParams().set('jobSeekerId', jobSeekerId.toString());
    return this.http.get(`${this.apiUrl}/GetProfile`, { params });
  }

  updateProfile(jobSeekerId: number, profile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateProfile?jobSeekerId=${jobSeekerId}`, profile);
  }
}
