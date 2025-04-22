import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserloginComponent } from './auth/userlogin/userlogin.component';
import { UserRegisterComponent } from './auth/user-register/user-register.component';
import { RecruitersLoginComponent } from './auth/recruiters-login/recruiters-login.component';
import { RecruitersRegisterComponent } from './auth/recruiters-register/recruiters-register.component';
import { HomeComponent } from './auth/home/home.component';
import { RecruitersdashboardModule } from './recruitersdashboard/recruitersdashboard.module';
import { DashboardComponent } from './recruitersdashboard/dashboard/dashboard.component';
import { UdashboardComponent } from './userdashboard/udashboard/udashboard.component';
import { ProfileComponent } from './recruitersdashboard/profile/profile.component';
import { PostjobsComponent } from './recruitersdashboard/postjobs/postjobs.component';
import { ManageApplicationComponent } from './recruitersdashboard/manage-application/manage-application.component';
import { TestComponent } from './userdashboard/test/test.component';
import { UserprofileComponent } from './userdashboard/userprofile/userprofile.component';
import { ApplyjobsComponent } from './userdashboard/applyjobs/applyjobs.component';
import { AppliedjobsComponent } from './userdashboard/appliedjobs/appliedjobs.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    {path: 'userlogin', component:UserloginComponent },
    {path: 'user-register', component:UserRegisterComponent },
    {path: 'recruiters-login', component:RecruitersLoginComponent },
    {path: 'recruiters-register', component:RecruitersRegisterComponent },
    {path: 'dashboard', component:DashboardComponent },
    {path: 'userdashboard', component:UdashboardComponent},
    {path: 'profile',component:ProfileComponent},
    {path: 'postjob',component:PostjobsComponent},
    {path: 'rec-dashboard',component:DashboardComponent},
    {path: 'manage-application',component:ManageApplicationComponent},
    {path: 'psychometric-test',component:TestComponent},
    {path: 'userprofile',component:UserprofileComponent},
    {path: 'applyjobs',component:ApplyjobsComponent},
    {path: 'appliedjobs',component:AppliedjobsComponent},

];
