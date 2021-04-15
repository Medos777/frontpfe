import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTarifComponent } from './list-tarif.component';

describe('ListTarifComponent', () => {
  let component: ListTarifComponent;
  let fixture: ComponentFixture<ListTarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTarifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
