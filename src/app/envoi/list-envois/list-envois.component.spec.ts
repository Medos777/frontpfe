import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnvoisComponent } from './list-envois.component';

describe('ListEnvoisComponent', () => {
  let component: ListEnvoisComponent;
  let fixture: ComponentFixture<ListEnvoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEnvoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnvoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
