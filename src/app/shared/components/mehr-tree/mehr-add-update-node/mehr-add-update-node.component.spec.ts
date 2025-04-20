import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MehrAddUpdateNodeComponent } from './mehr-add-update-node.component';

describe('MehrAddUpdateNodeComponent', () => {
  let component: MehrAddUpdateNodeComponent;
  let fixture: ComponentFixture<MehrAddUpdateNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MehrAddUpdateNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MehrAddUpdateNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
