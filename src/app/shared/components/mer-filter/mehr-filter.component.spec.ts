import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MehrFilterComponent } from './mehr-filter.component';

describe('MehrFilterComponent', () => {
  let component: MehrFilterComponent;
  let fixture: ComponentFixture<MehrFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MehrFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MehrFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
