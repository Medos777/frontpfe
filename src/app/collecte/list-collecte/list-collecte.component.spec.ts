import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCollecteComponent } from './list-collecte.component';

describe('ListCollecteComponent', () => {
  let component: ListCollecteComponent;
  let fixture: ComponentFixture<ListCollecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCollecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCollecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
