import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessModalComponent } from './business-modal.component';

describe('BusinessModalComponent', () => {
  let component: BusinessModalComponent;
  let fixture: ComponentFixture<BusinessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
