import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VoitureService } from 'src/app/service/voiture.service';
@Component({
  selector: 'app-add-voiture',
  templateUrl: './add-voiture.component.html',
  styleUrls: ['./add-voiture.component.css']
})
export class AddVoitureComponent implements OnInit {
  submitted=false;
  constructor(public crudApi: VoitureService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddVoitureComponent>,
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
        model: ['', [Validators.required,Validators.minLength(1)]],
        marque: ['', [Validators.required,Validators.minLength(2)]],
        matricule: ['', [Validators.required,Validators.minLength(4)]],

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
  let mod:String=this.crudApi.dataForm.value.libelle;
    this.crudApi.createData(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/voitures']); 
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
      this.router.navigate(['/voitures']);
    });
  }


}
