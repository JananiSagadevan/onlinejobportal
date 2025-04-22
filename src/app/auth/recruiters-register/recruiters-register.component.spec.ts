import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersRegisterComponent } from './recruiters-register.component';

describe('RecruitersRegisterComponent', () => {
  let component: RecruitersRegisterComponent;
  let fixture: ComponentFixture<RecruitersRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitersRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitersRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
