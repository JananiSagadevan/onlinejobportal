import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecNavbarComponent } from '../rec-navbar/rec-navbar.component';
@Component({
  selector: 'app-postjobs',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RecNavbarComponent],
  templateUrl: './postjobs.component.html',
  styleUrl: './postjobs.component.css'
})
export class PostjobsComponent {
  jobForm: FormGroup;
  jobs: any[] = [];
  isEditing = false;
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      jobName: ['', Validators.required],
      jobDescription: ['', Validators.required],
      salary: ['', Validators.required],
      location: ['', Validators.required],
      jobType: ['', Validators.required],
    });
  }

  addJob() {
    if (this.jobForm.valid) {
      if (this.isEditing && this.editingIndex !== null) {
        this.jobs[this.editingIndex] = this.jobForm.value;
        this.isEditing = false;
        this.editingIndex = null;
      } else {
        this.jobs.push(this.jobForm.value);
      }
      this.jobForm.reset();
    }
  }

  editJob(index: number) {
    this.jobForm.setValue(this.jobs[index]);
    this.isEditing = true;
    this.editingIndex = index;
  }

  deleteJob(index: number) {
    this.jobs.splice(index, 1);
  }  }

 
  
 


 