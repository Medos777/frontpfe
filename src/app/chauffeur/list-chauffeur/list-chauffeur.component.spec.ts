import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChauffeurComponent } from './list-chauffeur.component';

describe('ListChauffeurComponent', () => {
  let component: ListChauffeurComponent;
  let fixture: ComponentFixture<ListChauffeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChauffeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
