import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListlDepotComponent } from './listl-depot.component';

describe('ListlDepotComponent', () => {
  let component: ListlDepotComponent;
  let fixture: ComponentFixture<ListlDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListlDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListlDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
