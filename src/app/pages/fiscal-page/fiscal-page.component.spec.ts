import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalPageComponent } from './fiscal-page.component';

describe('FiscalPageComponent', () => {
  let component: FiscalPageComponent;
  let fixture: ComponentFixture<FiscalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiscalPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiscalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
