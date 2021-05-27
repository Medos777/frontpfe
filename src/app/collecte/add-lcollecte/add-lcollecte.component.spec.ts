import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLcollecteComponent } from './add-lcollecte.component';

describe('AddLcollecteComponent', () => {
  let component: AddLcollecteComponent;
  let fixture: ComponentFixture<AddLcollecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLcollecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLcollecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
