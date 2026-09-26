import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatePrep } from './gate-prep';

describe('GatePrep', () => {
  let component: GatePrep;
  let fixture: ComponentFixture<GatePrep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatePrep],
    }).compileComponents();

    fixture = TestBed.createComponent(GatePrep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
