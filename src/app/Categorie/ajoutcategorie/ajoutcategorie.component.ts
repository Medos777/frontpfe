import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/service/categorie.service';

@Component({
  selector: 'app-ajoutcategorie',
  templateUrl: './ajoutcategorie.component.html',
  styleUrls: ['./ajoutcategorie.component.css']
})
export class AjoutcategorieComponent implements OnInit {
  submitted=false;
  constructor(public crudApi: CategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AjoutcategorieComponent>,
    ) { }

  ngOnInit() {
    this.getData();
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
   }


  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required,Validators.minLength(3)]],
        libelle: ['', [Validators.required,Validators.minLength(4)]],
      });
      this.crudApi.getCode().subscribe(
        response =>{
          let num=response+1;
          if(num<10)
            num = '00'+num.toString();
          else if(num<100)
          num = '0'+num.toString();
          else num=num.toString(); 
         

          this.f['code'].setValue(num);
          }
       );  
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
  let lib:String=this.crudApi.dataForm.value.libelle;
  if(this.veriflib(lib)){
    this.crudApi.createData(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/categories']); 
    });
  }
 
}
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
   
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/categories']);
    });
  }
veriflib(lib):boolean{
  for(let cat of this.crudApi.list ){
    if (cat.libelle==lib)
    return false
  }
  
return true;
}
}