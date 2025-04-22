import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersLoginComponent } from './recruiters-login.component';

describe('RecruitersLoginComponent', () => {
  let component: RecruitersLoginComponent;
  let fixture: ComponentFixture<RecruitersLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitersLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitersLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
