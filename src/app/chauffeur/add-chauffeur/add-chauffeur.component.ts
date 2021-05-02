import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChauffeurService } from 'src/app/service/chauffeur.service';
@Component({
  selector: 'app-add-chauffeur',
  templateUrl: './add-chauffeur.component.html',
  styleUrls: ['./add-chauffeur.component.css']
})
export class AddChauffeurComponent implements OnInit {

  submitted=false;
  constructor(public crudApi: ChauffeurService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddChauffeurComponent>,
    ) { }

  ngOnInit() {
    this.getData();
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
   }


  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required,Validators.minLength(1)]],
        nom: ['', [Validators.required,Validators.minLength(3)]],
        prenom: ['', [Validators.required,Validators.minLength(3)]],
        cin: [0, [Validators.required,Validators.minLength(8)]],
        adresse: ['', [Validators.required,Validators.minLength(3)]],
        date_naissance: ['1988-10-02', [Validators.required,Validators.minLength(3)]],

        tel: [0, [Validators.required,Validators.minLength(8)]],

      });
      
    }
   
    getData() {
      this.crudApi.getAll().subscribe(
         response =>{this.crudApi.list = response;}
        );
     
     
     }

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  get f() { return this.crudApi.dataForm.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.crudApi.dataForm.invalid){
      console.log("invalid")
     return;

    }
   
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
      
     this.updateData()
    }
   
}
  
   

addData() {
    this.crudApi.createData(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/chauffeurs']); 
    });
  
 
}
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
   
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/chauffeurs']);
    });
  }

  

}
