import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { AjoutArticleComponent } from '../ajout-article/ajout-article.component';

@Component({
  selector: 'app-liste-article',
  templateUrl: './liste-article.component.html',
  styleUrls: ['./liste-article.component.css']
})
export class ListeArticleComponent implements OnInit {
  article : Article;
  p: number = 1;
  control: FormControl = new FormControl('');
  role: any;
  constructor(public crudApi: ArticleService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,public tokenService: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AjoutArticleComponent>,) { }
 
  ngOnInit() {
    
    this.getData();
    if(this.tokenService.getToken())
    {
      this.role=this.tokenService.getUser().role;
    }
  }


  addArticle()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="45%";
    dialogConfig.height="100%";

    this.matDialog.open(AjoutArticleComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
   
  }
  
  
  removeData(id: number) {
    const message = `Are you sure you want to do this?`;


    if (window.confirm('Are sure you want to delete this Scatégorie ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Article) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.height="100%";
    
    this.matDialog.open(AjoutArticleComponent, dialogConfig);
  }

}