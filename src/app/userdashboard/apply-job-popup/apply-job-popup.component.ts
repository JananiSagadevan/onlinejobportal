import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apply-job-popup',
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-job-popup.component.html',
  styleUrls: ['./apply-job-popup.component.css']
})
export class ApplyJobPopupComponent {
  @Input() applicationData: any;
  @Output() submitApplication = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();

  onSubmit() {
    this.submitApplication.emit(this.applicationData);
  }

  onClose() {
    this.closePopup.emit();
  }
}
