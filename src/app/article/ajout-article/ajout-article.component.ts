import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Scategorie } from 'src/app/model/scategorie';
import { ArticleService } from 'src/app/service/article.service';
import { CategorieService } from 'src/app/service/categorie.service';
import { ScategorieService } from 'src/app/service/scategorie.service';

@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.component.html',
  styleUrls: ['./ajout-article.component.css']
})
export class AjoutArticleComponent implements OnInit {
  scategorieList: any;
  scategorie: any;
  wcode: any;
  constructor(public crudApi: ArticleService ,public fb: FormBuilder,public toastr: ToastrService,
    public scategorieService: ScategorieService,
    public categorieService: CategorieService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AjoutArticleComponent>,
    
    ) { }
    get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
   if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    this.scategorieService.getAll().subscribe(
      response =>{this.scategorieList = response;}
     );
   }
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        code_b: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        pa: [0, [Validators.required]],
        pv: [0, [Validators.required]],
        tva: [0, [Validators.required]],
        fodec: [0, [Validators.required]],
        stock: [0, [Validators.required]],
        stkinit: [0, [Validators.required]],
        code_categ: ['', [Validators.required]],
        code_scateg: ['', [Validators.required]],
        profile : [],
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
  


onSelectScateg(id_scateg: string)
{
 this.scategorieService.getData(id_scateg).subscribe(
    response =>{
      this.scategorie = response;
      this.wcode = (10000 + this.scategorie.rang).toString().substring(1);
      this.wcode = this.scategorie.categorie+this.scategorie.code+this.wcode;
      this.f['code'].setValue(this.wcode);
      }
   );  
} 

addData() {
  this.crudApi.createData(this.crudApi.dataForm.value,this.crudApi.dataForm.value['code_scateg']).
  subscribe( data => {
    this.toastr.success( 'Validation Faite avec Success'); 
    this.router.navigate(['/articles']);
  });
}
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.router.navigate(['/articles']); 
    });
  }


    
  }