import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaserInformationComponent } from './purchaser-information.component';

describe('PurchaserInformationComponent', () => {
  let component: PurchaserInformationComponent;
  let fixture: ComponentFixture<PurchaserInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaserInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
