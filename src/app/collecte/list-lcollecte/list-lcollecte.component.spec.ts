import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLcollecteComponent } from './list-lcollecte.component';

describe('ListLcollecteComponent', () => {
  let component: ListLcollecteComponent;
  let fixture: ComponentFixture<ListLcollecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLcollecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLcollecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
