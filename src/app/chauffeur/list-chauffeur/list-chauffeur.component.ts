import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chauffeur } from 'src/app/model/chauffeur';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { UserService } from 'src/app/service/user.service';
import { ChauffeurService } from 'src/app/service/chauffeur.service';
import { AddChauffeurComponent } from '../add-chauffeur/add-chauffeur.component';
@Component({
  selector: 'app-list-chauffeur',
  templateUrl: './list-chauffeur.component.html',
  styleUrls: ['./list-chauffeur.component.css']
})
export class ListChauffeurComponent implements OnInit {

  chauffeur : Chauffeur;
  control: FormControl = new FormControl('');
  p: number = 1;
    role: string;
  constructor(private userService: UserService,public crudApi: ChauffeurService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddChauffeurComponent>,public tokenService: TokenStorageService) { }
  
  ngOnInit() {
    
    this.getData();
    if(this.tokenService.getToken())
    {
      this.role=this.tokenService.getUser().role;
    }
  
  
  }
  addChauffeur()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddChauffeurComponent, dialogConfig);
  }
  
  
  
  
  getData() {
   this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
  
  
  }
  
  
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this  ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data deleted!',); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Chauffeur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddChauffeurComponent, dialogConfig);
  }
}
