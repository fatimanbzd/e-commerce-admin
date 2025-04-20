import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMessageListComponent } from './vendor-message-list.component';

describe('VendorMessageListComponent', () => {
  let component: VendorMessageListComponent;
  let fixture: ComponentFixture<VendorMessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorMessageListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
