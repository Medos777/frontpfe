import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLfactureComponent } from './add-lfacture.component';

describe('AddLfactureComponent', () => {
  let component: AddLfactureComponent;
  let fixture: ComponentFixture<AddLfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLfactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
