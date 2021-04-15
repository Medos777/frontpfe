import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTarifComponent } from './add-tarif.component';

describe('AddTarifComponent', () => {
  let component: AddTarifComponent;
  let fixture: ComponentFixture<AddTarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTarifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
