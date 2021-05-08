import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role:string;
  LoginForm:  FormGroup; 
  submitted=false;
  isLoggedIn=false;
  errore=false;
  logintest:any=false;
  msgerreur:any;
  constructor(private formBuilder: FormBuilder,private userService:UserService ,private authentification:AuthentificationService,private tokenservice:TokenStorageService,private router:Router) { }
  ngOnInit() {
    this.LoginForm=this.formBuilder.group({
      username: ['',[Validators.required,Validators.minLength(4)]],
      password:['',[Validators.required,Validators.minLength(8)]],

    })
    if(this.tokenservice.getToken())
    {
      this.authentification.loginc=true;
      this.role="agent"
      
    }
  }
  get f() { return this.LoginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.msgerreur = "";


    
    if (this.LoginForm.invalid) {
        return console.log("errorform")   }
        console.log(this.f.username.value,this.f.password.value)
     
this.authentification.login(this.f.username.value,this.f.password.value).subscribe(
  data=>{
    this.authentification.connected=true;
    this.tokenservice.saveToken(data.accessToken);
    this.tokenservice.saveUser(data);
    this.isLoggedIn=true;
    this.role=this.tokenservice.getUser().role;    
    console.log(data);
    console.log(this.role);
    this.authentification.loginc=true;
    if(this.role=='admin')
    this.router.navigate(['clients']);
    else if (this.role=='agent')
    this.router.navigate(['categories']);

    
    else if  (this.role=='facteur')
    this.router.navigate(['/']);
    else this.router.navigate(['/']);


    
  },
  err=>{

console.log(err); 
this.errore=true;
this.userService.UserExist(this.f.username.value).subscribe(
  data=>{this.logintest=data
    console.log(this.msgerreur); 

  });
if(this.logintest==false)

  this.msgerreur='User n’existe pas ';
  else
  this.msgerreur='Mot de passe Incorrect';

  }

)

}

}
