import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenavbarComponent } from './homenavbar.component';

describe('HomenavbarComponent', () => {
  let component: HomenavbarComponent;
  let fixture: ComponentFixture<HomenavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomenavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
