import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Scategorie } from 'src/app/model/scategorie';
import { ScategorieService } from 'src/app/service/scategorie.service';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { AjoutScategorieComponent } from '../ajout-scategorie/ajout-scategorie.component';

@Component({
  selector: 'app-list-scategorie',
  templateUrl: './list-scategorie.component.html',
  styleUrls: ['./list-scategorie.component.css']
})
export class ListScategorieComponent implements OnInit {
  scategorie : Scategorie;
  tab:Scategorie[];
  p: number = 1;
  control: FormControl = new FormControl('');
  role: string;
  constructor(public crudApi: ScategorieService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,private tokenService: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AjoutScategorieComponent>,) { }
 
  ngOnInit() {
    
    this.getData();
    if(this.tokenService.getToken())
    {
      this.role=this.tokenService.getUser().role;
    }
  }
  addScategorie()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AjoutScategorieComponent, dialogConfig);
  }
 

  
  getData() {

    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;
      }
     );

  }
  
  
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Scatégorie ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' Sous Categorie deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Scategorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AjoutScategorieComponent, dialogConfig);
  }

}