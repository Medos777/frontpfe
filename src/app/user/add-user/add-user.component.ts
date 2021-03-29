import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUSerComponent implements OnInit {
  constructor(public crudApi: UserService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddUSerComponent>,) { }
    isClient:boolean=false;
    isAgentorFacteur:boolean=false;
  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()}
    

    


  
   }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        username: ['', [Validators.required, Validators.minLength(3)]],
        nom:['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required ,Validators.minLength(5)]],
        adresnomse: ['', [Validators.required, Validators.minLength(5)]],
        adresse: ['', [Validators.required, Validators.minLength(8)]],
        tel: ['', [Validators.required,Validators.email, Validators.minLength(10)]],
        matricule: ['', [Validators.required, Validators.minLength(8)]],
        typec: ['', [Validators.required, Validators.minLength(8)]],
        role: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
       
    
        });
    }
   
  

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
      
     this.updateData()
    }
   
}
  
   
onSelectRole(event){
  console.log(event);
  if(event.value=="client"){
  this.isClient=false;
  this.isAgentorFacteur=true;
}
else{
  this.isClient=true;
  this.isAgentorFacteur=false;

}

  
}
addData() {
  console.log(this.crudApi.dataForm.value);
  this.crudApi.addUser(this.crudApi.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();
    
    this.crudApi.listUserByRole("client").subscribe(
      response =>{this.crudApi.list = response;}
     );
    this.toastr.success( ' Success'); 
    this.router.navigate(['/clients']);
  });
}
  updateData()
  {
  
    this.crudApi.updateUser(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success( 'Modification Faite avec Success');
     
      this.crudApi.listUserByRole("client").subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/clients']);
    });
  }
    
}
