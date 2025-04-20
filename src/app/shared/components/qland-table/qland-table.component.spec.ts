import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlandTableComponent } from './qland-table.component';

describe('QlandTableComponent', () => {
  let component: QlandTableComponent;
  let fixture: ComponentFixture<QlandTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QlandTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QlandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
