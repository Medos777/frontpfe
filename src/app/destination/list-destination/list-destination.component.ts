import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/model/categorie';
import { DestinationService } from 'src/app/service/destination.service';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { UserService } from 'src/app/service/user.service';
import { AddDestinationComponent } from '../add-destination/add-destination.component';
@Component({
  selector: 'app-list-destination',
  templateUrl: './list-destination.component.html',
  styleUrls: ['./list-destination.component.css']
})
export class ListDestinationComponent implements OnInit {

  categorie : Categorie;
control: FormControl = new FormControl('');
p: number = 1;
  role: string;
constructor(private userService: UserService,public crudApi: DestinationService, public toastr: ToastrService,
  private router : Router,public fb: FormBuilder,
  private matDialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef:MatDialogRef<AddDestinationComponent>,public tokenService: TokenStorageService) { }

ngOnInit() {
  
  this.getData();
  if(this.tokenService.getToken())
  {
    this.role=this.tokenService.getUser().role;
  }


}
addDestination()
{

  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="50%";
  this.matDialog.open(AddDestinationComponent, dialogConfig);
}




getData() {
 this.crudApi.getAll().subscribe(
    response =>{this.crudApi.list = response;}
   );


}
goTarif(){
  this.router.navigate(['/tarifs']);

}

removeData(id: number) {
  if (window.confirm('Are sure you want to delete this Destination ?')) {
  this.crudApi.deleteData(id)
    .subscribe(
      data => {
        console.log(data);
        this.toastr.warning(' Destination deleted!',); 
        this.getData();
      },
      error => console.log(error));
}
}
selectData(item : Categorie) {
  this.crudApi.choixmenu = "M";
  this.crudApi.dataForm = this.fb.group(Object.assign({},item));
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="50%";
  
  this.matDialog.open(AddDestinationComponent, dialogConfig);
}

}
