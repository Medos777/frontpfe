import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { AuthentificationService } from 'src/app/service/authentification.service';

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
  constructor(private formBuilder: FormBuilder,private authentification:AuthentificationService,private tokenservice:TokenStorageService,private router:Router) { }
  ngOnInit() {
    this.LoginForm=this.formBuilder.group({
      username: ['',[Validators.required]],
      password:['',[Validators.required]],

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

    
    if (this.LoginForm.invalid) {
        return console.log("errore")   }
        console.log(this.f.username.value,this.f.password.value)
this.authentification.login(this.f.username.value,this.f.password.value).subscribe(
  data=>{
    this.authentification.connected=true;
    this.tokenservice.saveToken(data.accessToken);
    this.tokenservice.saveUser(data);
    this.isLoggedIn=true;
    this.role="agent"
    console.log('success');
    console.log(data);
    console.log(this.role);
    this.authentification.loginc=true;
    this.router.navigate(['categorie']);


    
  },
  err=>{

console.log(err); 
this.errore=true;
  }

)

}

}
