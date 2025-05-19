import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJobPopupComponent } from './apply-job-popup.component';

describe('ApplyJobPopupComponent', () => {
  let component: ApplyJobPopupComponent;
  let fixture: ComponentFixture<ApplyJobPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyJobPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyJobPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
