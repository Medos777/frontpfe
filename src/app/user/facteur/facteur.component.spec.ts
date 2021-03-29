import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacteurComponent } from './facteur.component';

describe('FacteurComponent', () => {
  let component: FacteurComponent;
  let fixture: ComponentFixture<FacteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
