import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthentificationService } from '../../service/authentification.service';
import { TokenStorageService } from '../../service/tokenStorage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-updateprofil',
  templateUrl: './updateprofil.component.html',
  styleUrls: ['./updateprofil.component.css']
})
export class UpdateprofilComponent implements OnInit {

  constructor(private AuthentificationService : AuthentificationService,private tokenService: TokenStorageService,public crudApi: UserService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<UpdateprofilComponent>,) { }
   
    submitted=false;
  ngOnInit(): void {
    this.crudApi.dataForm.addControl('password', new FormControl(''));

     }
  get f() { return this.crudApi.dataForm.controls; }

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    console.log('before ',this.crudApi.dataForm.value);
    console.log('after ',this.crudApi.dataForm.value);

    this.submitted = true;
    if(this.crudApi.dataForm.invalid){
      return;
 
     }
    
     this.updateData()
    
}
  
   


  updateData()
  {
    this.crudApi.updateUserProfil(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success( 'Modification Faite avec Success');
      this.tokenService.signOut();
      this.AuthentificationService.logout();
      this.AuthentificationService.loginc = false;
      this.AuthentificationService.connected=false;
      this.router.navigate(['login']);    });
  }

}
