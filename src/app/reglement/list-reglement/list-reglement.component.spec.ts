import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReglementComponent } from './list-reglement.component';

describe('ListReglementComponent', () => {
  let component: ListReglementComponent;
  let fixture: ComponentFixture<ListReglementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReglementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
