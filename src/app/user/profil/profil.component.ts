import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/service/categorie.service';
import { UserService } from 'src/app/service/user.service';

import { UpdateprofilComponent } from '../updateprofil/updateprofil.component'
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<UpdateprofilComponent>,public tokenService: TokenStorageService) { }
  ngOnInit(): void {
    this.user=this.tokenService.getUser();
  }
  updateProfil(item : User) {
    this.userService.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.height="80%";

    
    this.matDialog.open(UpdateprofilComponent, dialogConfig);
  }


}
