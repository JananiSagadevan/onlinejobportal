import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecNavbarComponent } from './rec-navbar.component';

describe('RecNavbarComponent', () => {
  let component: RecNavbarComponent;
  let fixture: ComponentFixture<RecNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
