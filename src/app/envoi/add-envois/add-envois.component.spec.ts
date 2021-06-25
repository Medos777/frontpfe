import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnvoisComponent } from './add-envois.component';

describe('AddEnvoisComponent', () => {
  let component: AddEnvoisComponent;
  let fixture: ComponentFixture<AddEnvoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnvoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnvoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
