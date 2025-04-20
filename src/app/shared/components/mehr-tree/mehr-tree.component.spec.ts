import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MehrTreeComponent } from './mehr-tree.component';

describe('MehrTreeComponent', () => {
  let component: MehrTreeComponent;
  let fixture: ComponentFixture<MehrTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MehrTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MehrTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
