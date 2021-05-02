import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlDepotComponent } from './addl-depot.component';

describe('AddlDepotComponent', () => {
  let component: AddlDepotComponent;
  let fixture: ComponentFixture<AddlDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
