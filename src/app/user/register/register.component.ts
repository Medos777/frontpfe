import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  a:  FormGroup; 
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {}

}
