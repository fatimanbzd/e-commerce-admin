import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorListPageComponent } from './vendor-list-page.component';

describe('VendorListPageComponent', () => {
  let component: VendorListPageComponent;
  let fixture: ComponentFixture<VendorListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
