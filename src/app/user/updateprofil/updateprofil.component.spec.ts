import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprofilComponent } from './updateprofil.component';

describe('UpdateprofilComponent', () => {
  let component: UpdateprofilComponent;
  let fixture: ComponentFixture<UpdateprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprofilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
