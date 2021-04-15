import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tarif } from 'src/app/model/tarif';
import { TarifService } from 'src/app/service/tarif.service';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { AddTarifComponent } from '../add-tarif/add-tarif.component'
@Component({
  selector: 'app-list-tarif',
  templateUrl: './list-tarif.component.html',
  styleUrls: ['./list-tarif.component.css']
})
export class ListTarifComponent implements OnInit {

  tarif : Tarif;
  tab:Tarif[];
  p: number = 1;
  control: FormControl = new FormControl('');
  role: string;
  constructor(public crudApi: TarifService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,private tokenService: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddTarifComponent>,) { }
 
  ngOnInit() {
    
    this.getData();
    if(this.tokenService.getToken())
    {
      this.role=this.tokenService.getUser().role;
    }
  }
  addScategorie()
  {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddTarifComponent, dialogConfig);
  }
 
  

  
  getData() {

    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;
      }
     );

  }
  
  
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Tarif ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Tarif deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Tarif) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddTarifComponent, dialogConfig);
  }
}
