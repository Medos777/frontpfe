import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthentificationService } from '../../service/authentification.service';
import { TokenStorageService } from '../../service/tokenStorage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-updateprofil',
  templateUrl: './updateprofil.component.html',
  styleUrls: ['./updateprofil.component.css']
})
export class UpdateprofilComponent implements OnInit {
  flag=false;
  usernameexist: any;
  emailexist: any;
  orgusername: any;
  orgemail: any;
  constructor(private AuthentificationService : AuthentificationService,private tokenService: TokenStorageService,public crudApi: UserService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<UpdateprofilComponent>,) { }
   
    submitted=false;
  ngOnInit(): void {
    this.crudApi.dataForm.addControl('password', new FormControl(''));
    this.orgusername=this.crudApi.dataForm.value.username;
    this.orgemail=this.crudApi.dataForm.value.email;
    console.log(this.orgusername,this.orgemail);

     }
  get f() { return this.crudApi.dataForm.controls; }

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    console.log('before ',this.crudApi.dataForm.value);
    this.crudApi.existByUsername(this.f.username.value)
    .subscribe(
      data=>{this.usernameexist=data
        if (data && this.orgusername!=this.crudApi.dataForm.value.username)
        {
        
            console.log('erreur');
            this.flag=true;
        }
        
    
      }
      ,
      (err) => console.error(err)
     
      );
      this.crudApi.existByemail(this.f.email.value)
      .subscribe(
        data=>{this.emailexist=data
          console.log(data); 
          if(data && this.orgemail!=this.crudApi.dataForm.value.email)
            {
              console.log('erreur');
              this.flag=true;
            }
            this.submitted = true;
            console.log(this.flag);
        
            if(this.crudApi.dataForm.invalid || this.flag){
              console.log('erreur');
         
             }
             else
             this.updateData()
        }
        ,(err) => console.error(err)
        ); 
    
   
    
}
  verificationusernameemail() {
   
      console.log(this.flag);
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
