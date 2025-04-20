import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsListPageComponent } from './vendors-list-page.component';

describe('VendorsListPageComponent', () => {
  let component: VendorsListPageComponent;
  let fixture: ComponentFixture<VendorsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorsListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
