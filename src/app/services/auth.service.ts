import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5174'; // adjust port as needed

  constructor(private http: HttpClient) {}

  //  USER REGISTER
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Auth/register/user`, {
      fullName: data.fullname,
      email: data.email,
      passwordHash: data.passwordhash
    });
  }

  //  USER LOGIN
  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Auth/login`, loginData);
  }

  //  RECRUITER REGISTER
  registerRecruiter(recruiterData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Auth/register/recruiter`, recruiterData);
  }

  //  RECRUITER LOGIN
  loginRecruiter(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${this.baseUrl}/api/Auth/login/recruiter`, payload);
  }


 
}
