import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUSerComponent } from './add-user.component';

describe('AddUSerComponent', () => {
  let component: AddUSerComponent;
  let fixture: ComponentFixture<AddUSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUSerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
