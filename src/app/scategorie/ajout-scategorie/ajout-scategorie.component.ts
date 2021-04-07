import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/model/categorie';
import { Scategorie } from 'src/app/model/scategorie';
import { CategorieService } from 'src/app/service/categorie.service';
import { ScategorieService } from 'src/app/service/scategorie.service';

@Component({
  selector: 'app-ajout-scategorie',
  templateUrl: './ajout-scategorie.component.html',
  styleUrls: ['./ajout-scategorie.component.css']
})
export class AjoutScategorieComponent implements OnInit {
  CategorieList: Categorie[];
  submitted=false;
  listsc:Scategorie[];
  constructor(public crudApi: ScategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    
    public categorieService: CategorieService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AjoutScategorieComponent>,
    
    ) { }

  ngOnInit() {
    this.getData();
    if (this.crudApi.choixmenu == "A")
    {this.infoForm();}
    else 
    {
      this.crudApi.dataForm.addControl('ccateg', new FormControl('', Validators.required));
    }
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
    this.submitted = true;
    if(this.crudApi.dataForm.invalid){
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
getData() {
  this.crudApi.getAll().subscribe(
     response =>{this.listsc = response;}
    );
 
 
 }
OnSelectCateg(ctrl){
  if(ctrl.selectedIndex==0)
  {
   

    this.f['ccateg'].setValue('');

  }
  else{
    let num:number;
    let code:any;
  code=this.CategorieList[ctrl.selectedIndex-1].code;
  this.crudApi.getNumero(code).subscribe(
 reponse=>{
   num=reponse;
   if (num>0)
   code=(100000+num+1).toString().substring(1);
   else  code=code+'01';
   this.f['code'].setValue(code);
 }


  );

  }

}
veriflib(lib):boolean{
  for(let scat of this.listsc ){
    if (scat.libelle==lib)
    return false
  }
  
return true;
}
addData() {
  let lib:String=this.crudApi.dataForm.value.libelle;
  if(this.veriflib(lib))
  {
    this.crudApi.createData(this.crudApi.dataForm.value,this.crudApi.dataForm.value['ccateg']).
    subscribe( data => {
      this.dialogRef.close();
      
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/scategories']); 
    });
  }
 
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