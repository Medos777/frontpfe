import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLfactureComponent } from './list-lfacture.component';

describe('ListLfactureComponent', () => {
  let component: ListLfactureComponent;
  let fixture: ComponentFixture<ListLfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLfactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
