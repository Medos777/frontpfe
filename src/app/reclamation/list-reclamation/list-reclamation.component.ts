import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from 'src/app/model/reclamation';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { UserService } from 'src/app/service/user.service';
import { ReclamationService } from 'src/app/service/reclamation.service';
import { AddReclamationComponent } from '../add-reclamation/add-reclamation.component';
@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {

  p: number = 1;
  role: string;
constructor(private userService: UserService,public crudApi: ReclamationService, public toastr: ToastrService,
  private router : Router,public fb: FormBuilder,
  private matDialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef:MatDialogRef<AddReclamationComponent>,public tokenService: TokenStorageService) { }

ngOnInit() {
  
  this.getData();
  if(this.tokenService.getToken())
  {
    this.role=this.tokenService.getUser().role;
  }


}
addRecl()
{
  this.crudApi.choixmenu = "A";
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="50%";
  this.matDialog.open(AddReclamationComponent, dialogConfig);
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
        this.toastr.warning(' Reclamation deleted!',); 
        this.getData();
      },
      error => console.log(error));
}
}
selectData(item : Reclamation) {
  this.crudApi.choixmenu = "M";
  this.crudApi.dataForm = this.fb.group(Object.assign({},item));
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="50%";
  
  this.matDialog.open(AddReclamationComponent, dialogConfig);
}

}
