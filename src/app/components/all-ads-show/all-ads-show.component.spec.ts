import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdsShowComponent } from './all-ads-show.component';

describe('AllAdsShowComponent', () => {
  let component: AllAdsShowComponent;
  let fixture: ComponentFixture<AllAdsShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAdsShowComponent]
    });
    fixture = TestBed.createComponent(AllAdsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
