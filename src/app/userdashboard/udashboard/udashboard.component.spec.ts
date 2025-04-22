import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdashboardComponent } from './udashboard.component';

describe('UdashboardComponent', () => {
  let component: UdashboardComponent;
  let fixture: ComponentFixture<UdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
