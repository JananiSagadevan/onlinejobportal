import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
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
export interface JobApplication {
  applicationId: number;
  jobSeekerId: number;
  jobId: number;
  resumeUrl: string;
  coverLetter: string;
  appliedDate: Date;
  currentStatus: string;
  education: string;
  experience: string;
  skills: string;
  profileSummary: string;
  profilePictureUrl: string;
  mobile: string;
  gender: string;
  dateOfBirth: Date;
}
export interface Job {
  jobId: number;
  recruiterId: number;
  jobTitle: string;
  companyName: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string;
  postedDate: Date;
  applicationDeadline: Date;
}
export interface AppliedJob {
  application: JobApplication;
  job: Job;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:5174/api/User'; // Adjust as needed
  private apiUrl = 'http://localhost:5174/api';
  constructor(private http: HttpClient) {}

//   uploadImage(file: File): Observable<any> {
//     const formData = new FormData();
    
//     const userId = this.authService.getUserId();
//     if (userId !== null) {
//       formData.append('UserId', userId.toString());
//     } else {
//       console.error('UserId is missing!');
//       return new Observable(observer => {
//         observer.error('UserId is missing!');
//       });
//     }
//     formData.append('file', file);
//  //  Make sure this matches backend parameter
//     console.log('Sending form data with:', {
//     file: file.name,
//     userId: userId
//   });
//     return this.http.post(`${this.baseUrl}/upload-image`, formData);
//   }
  createProfile1(profile: JobSeekerProfile): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/createprofile`, profile);
  }
  createProfile(profile: JobSeekerProfile): Observable<any> {

    return this.http.post(`${this.baseUrl}/createprofile`, profile);
  }

  getProfile(jobSeekerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetProfile?jobSeekerId=${jobSeekerId}`);
  }

  updateProfile(jobSeekerId: number, profile: JobSeekerProfile): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateProfile?jobSeekerId=${jobSeekerId}`, profile);
  }
  uploadProfileWithCV(profileData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/File/upload-image`, profileData);
  }
  
  getApplicationsByJobSeeker(jobSeekerId: number): Observable<AppliedJob[]> {
    return this.http
      .get<JobApplication[]>(`${this.apiUrl}/Recruiter/GetApplicationsByJobSeekerbyid?jobSeekerId=${jobSeekerId}`)
      .pipe(
        switchMap((applications) => {
          const combined: Observable<AppliedJob>[] = applications.map((app) =>
            this.http.get<Job>(`${this.apiUrl}/User/GetJobById?jobId=${app.jobId}`).pipe(
              map((job) => ({
                application: app,
                job: job
              }))
            )
          );
          return forkJoin(combined); // wait for all job detail requests
        })
      );
  }
  // getUserDashboardStats(jobSeekerId: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/User/user/{jobSeekerId}=${jobSeekerId}`);
  // }
  getDashboardStats(jobSeekerId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5174/api/User/user/${jobSeekerId}`);
  }
  
}
