import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConwayViewComponent } from './conway-view.component';

describe('ConwayViewComponent', () => {
  let component: ConwayViewComponent;
  let fixture: ComponentFixture<ConwayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConwayViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConwayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
