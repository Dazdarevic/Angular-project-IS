import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdvertisementsComponent } from './all-advertisements.component';

describe('AllAdvertisementsComponent', () => {
  let component: AllAdvertisementsComponent;
  let fixture: ComponentFixture<AllAdvertisementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAdvertisementsComponent]
    });
    fixture = TestBed.createComponent(AllAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
