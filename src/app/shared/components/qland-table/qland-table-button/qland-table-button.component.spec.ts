import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlandTableButtonComponent } from './qland-table-button.component';

describe('QlandTableButtonComponent', () => {
  let component: QlandTableButtonComponent;
  let fixture: ComponentFixture<QlandTableButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QlandTableButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QlandTableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
