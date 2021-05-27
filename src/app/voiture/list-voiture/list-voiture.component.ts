import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Voiture } from 'src/app/model/voiture';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { UserService } from 'src/app/service/user.service';
import { VoitureService } from 'src/app/service/voiture.service';
import { AddVoitureComponent } from '../add-voiture/add-voiture.component';
@Component({
  selector: 'app-list-voiture',
  templateUrl: './list-voiture.component.html',
  styleUrls: ['./list-voiture.component.css']
})
export class ListVoitureComponent implements OnInit {

  voiture : Voiture;
  control: FormControl = new FormControl('');
  p: number = 1;
    role: string;
  constructor(private userService: UserService,public crudApi: VoitureService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddVoitureComponent>,public tokenService: TokenStorageService) { }
  
  ngOnInit() {
    
    this.getData();
    if(this.tokenService.getToken())
    {
      this.role=this.tokenService.getUser().role;
    }
  
  
  }
  addVoiture()
  {
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddVoitureComponent, dialogConfig);
  }
  
  
  
  
  getData() {
   this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
  
  
  }
  goChauffeurs(){
    this.router.navigate(['chauffeurs']);

  }
  
  
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this  ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' Voiture deleted!',); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Voiture) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddVoitureComponent, dialogConfig);
  }
}
