import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicShowcase } from './public-showcase';

describe('PublicShowcase', () => {
  let component: PublicShowcase;
  let fixture: ComponentFixture<PublicShowcase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicShowcase],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicShowcase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
