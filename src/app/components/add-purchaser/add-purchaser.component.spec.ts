import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaserComponent } from './add-purchaser.component';

describe('AddPurchaserComponent', () => {
  let component: AddPurchaserComponent;
  let fixture: ComponentFixture<AddPurchaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
