import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLreglementComponent } from './add-lreglement.component';

describe('AddLreglementComponent', () => {
  let component: AddLreglementComponent;
  let fixture: ComponentFixture<AddLreglementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLreglementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLreglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
