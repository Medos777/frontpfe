import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reglement } from 'src/app/model/reglement';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { UserService } from 'src/app/service/user.service';
import { ReglementService } from 'src/app/service/reglement.service';
import { AddReglementComponent } from '../add-reglement/add-reglement.component';
@Component({
  selector: 'app-list-reglement',
  templateUrl: './list-reglement.component.html',
  styleUrls: ['./list-reglement.component.css']
})
export class ListReglementComponent implements OnInit {

 

 
  p: number = 1;
    role: string;
  constructor(private userService: UserService,public crudApi: ReglementService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddReglementComponent>,public tokenService: TokenStorageService) { }
  
  ngOnInit() {
    
    this.getData();
    if(this.tokenService.getToken())
    {
      this.role=this.tokenService.getUser().role;
    }
  
  
  }
  addRegl()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddReglementComponent, dialogConfig);
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
          this.toastr.warning(' Reglement deleted!',); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Reglement) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddReglementComponent, dialogConfig);
  }

}
