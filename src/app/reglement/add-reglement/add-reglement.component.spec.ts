import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReglementComponent } from './add-reglement.component';

describe('AddReglementComponent', () => {
  let component: AddReglementComponent;
  let fixture: ComponentFixture<AddReglementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReglementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
