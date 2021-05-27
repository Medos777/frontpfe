import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotInterfaceComponent } from './chatbot-interface.component';

describe('ChatbotInterfaceComponent', () => {
  let component: ChatbotInterfaceComponent;
  let fixture: ComponentFixture<ChatbotInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
