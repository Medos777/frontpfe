import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/service/categorie.service';
import { ScategorieService } from 'src/app/service/scategorie.service';

@Component({
  selector: 'app-ajout-scategorie',
  templateUrl: './ajout-scategorie.component.html',
  styleUrls: ['./ajout-scategorie.component.css']
})
export class AjoutScategorieComponent implements OnInit {
  CategorieList: Categorie[];
  constructor(public crudApi: ScategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    
    public categorieService: CategorieService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AjoutScategorieComponent>,
    
    ) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm();}
    else 
    {
      this.crudApi.dataForm.addControl('ccateg', new FormControl('', Validators.required));
    }
    console.log(this.crudApi.dataForm);
    this.categorieService.getAll().subscribe(
      response =>{this.CategorieList = response;}
     );
   }

get f(){
  return this.crudApi.dataForm.controls;
}
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        rang: [1],
        ccateg: ['', [Validators.required]],
      
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
OnSelectCateg(ctrl){
  if(ctrl.selectedIndex==0)
  {
    console.log("c1")
    console.log(this.crudApi.dataForm.value);

    this.f['ccateg'].setValue('');

  }
  else{
    console.log("c2");
    console.log( this.f['ccateg']);

  }

}

addData() {
  this.crudApi.createData(this.crudApi.dataForm.value,this.crudApi.dataForm.value['ccateg']).
  subscribe( data => {
    this.dialogRef.close();
    
   
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
    this.router.navigate(['/scategories']); 
  });
}
  updateData()
  {
    console.log(this.crudApi.dataForm.value);

    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value['ccateg'],this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/scategories']); 
    });
  }


}