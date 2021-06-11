import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router  } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  encapsulation: ViewEncapsulation.None ,
  selector: 'app-chatbot-interface',
  templateUrl: './chatbot-interface.component.html',
  styleUrls: ['./chatbot-interface.component.css']
})
export class ChatbotInterfaceComponent implements OnInit {

  constructor(private router :Router,
    public dialogRef:MatDialogRef<ChatbotInterfaceComponent>,
    ) { }

  ngOnInit(): void {
  }
  onKeypressEvent(event: any){
    console.log(event.target.value);
  }
}
