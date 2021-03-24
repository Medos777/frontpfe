import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/model/categorie';
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
  CategorieList: Categorie[];
  userFile ;
  public imagePath;
  imgURL: any;
  scategorie: any;
  wcode: any;
  submitted= false;
  constructor(public crudApi: ArticleService ,public fb: FormBuilder,public toastr: ToastrService,
    public scategorieService: ScategorieService,
    public categorieService: CategorieService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AjoutArticleComponent>,
    
    ) { }
    get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
    this.categorieService.getAll().subscribe(
      response =>{this.CategorieList = response;}
     );
   if (this.crudApi.choixmenu == "A")
    {this.infoForm();}
    {
      this.crudApi.dataForm.addControl('cscateg', new FormControl('', Validators.required));
    }

    this.scategorieService.getAll().subscribe(
      response =>{this.scategorieList = response;}
     );
   }
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        code_b: ['6192421101009', [Validators.required,Validators.minLength(13)]],
        libelle: ['', [Validators.required,Validators.minLength(4)]],
        pa: [0, [Validators.required]],
        pv: [0, [Validators.required]],
        tva: [0, [Validators.required]],
        fodec: [0, [Validators.required]],
        stock: [0, [Validators.required]],
        stkinit: [0, [Validators.required]],
        code_categ: ['', [Validators.required]],
        cscateg: ['', [Validators.required]],
        profile : [],
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
  

onSelectCateg(id_categ)
{
  this.scategorieService.listScateg(id_categ.value).subscribe(
    response =>{this.scategorieList = response;}
   );  
} 
onSelectScateg(id_scateg)
{
  console.log(id_scateg);

 this.scategorieService.getData(id_scateg.value).subscribe(
    response =>{
      this.scategorie = response;
      this.wcode = (10000 + this.scategorie.rang).toString().substring(1);
      this.wcode = this.scategorie.categorie.libelle+this.scategorie.code+this.wcode;
      this.f['code'].setValue(this.wcode);
      }
   );  
} 

addData() {
  let form=this.crudApi.dataForm;
  let codecscateg=this.crudApi.dataForm.value['cscateg'];

  form.removeControl('code_categ');
  form.removeControl('cscateg');
  form.removeControl('profile');
  const formData = new  FormData();
  const article = form.value;
  formData.append('article',JSON.stringify(article));
  formData.append('file',this.userFile);

  this.crudApi.createData(formData,codecscateg).
  subscribe( data => {
    this.dialogRef.close();
    
   
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
    this.router.navigate(['/articles']);
  });
}
  updateData()
  {
    console.log(this.crudApi.dataForm.value)

    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value['cscateg'],this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/articles']); 
    });
  }
  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
     // this.f['profile'].setValue(file);
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.toastr.success( 'Only images are supported.');
      
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
     

    
  }
}