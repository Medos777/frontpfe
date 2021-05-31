import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-chatbot-interface',
  templateUrl: './chatbot-interface.component.html',
  styleUrls: ['./chatbot-interface.component.css']
})
export class ChatbotInterfaceComponent implements OnInit {

  constructor(private router :Router) { }

  ngOnInit(): void {
  }
  onKeypressEvent(event: any){
    console.log(event.target.value);
  }
}
