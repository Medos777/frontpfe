import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/model/article';
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
  ArticlesList: Article[];

  userFile ;
  public imagePath;
  imgURL: any;
  scategorie: any;
  code: any;
  num: any;

  submitted= false;
  constructor(public crudApi: ArticleService ,public fb: FormBuilder,public toastr: ToastrService,
    public scategorieService: ScategorieService,
    public categorieService: CategorieService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AjoutArticleComponent>,
    
    ) { }
    get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
    this.getData();

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
        libelle: ['', [Validators.required,Validators.minLength(4)]],
        pa: [0, [Validators.required]],
        pv: [0, [Validators.required]],
        tva: [0, [Validators.required]],
        stock: [0, [Validators.required]],
        stkinit: [0, [Validators.required]],
        code_categ: ['', [Validators.required]],
        cscateg: ['', [Validators.required]],
      });
    }

    getData() {
      this.crudApi.getAll().subscribe(
         response =>{this.ArticlesList= response;}
        );
     
     
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
    response1 =>{
      let scateg:any=response1;
      this.crudApi.getNumero(id_scateg.value).subscribe(
        response =>{
          this.num = response;
          console.log(this.num,scateg.code);
          this.num=this.num+1
          if(this.num>0)
          {
            if (this.num<10)
            this.code = (scateg.code+'00'+this.num).toString().substring(1);
            else if(this.num<100)
            this.code = (scateg.code+'0'+this.num).toString().substring(1);
            else
            this.code = (scateg.code+this.num).toString().substring(1);



          }
           
    
            else this.code=scateg.code+'001'
          this.f['code'].setValue(this.code);
          }
       );  

    }
  );

} 

addData() {
  let lib:String=this.crudApi.dataForm.value.libelle;
  if(this.veriflib(lib))
  {
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
  veriflib(lib):boolean{
    for(let art of this.ArticlesList){
      if (art.libelle==lib)
      return false
    }
    
  return true;
  }
}