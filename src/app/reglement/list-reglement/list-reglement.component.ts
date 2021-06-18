import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { UserService } from 'src/app/service/user.service';
import { ReglementService } from 'src/app/service/reglement.service';
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
   public tokenService: TokenStorageService) { }
  
  ngOnInit() {
    
    this.getData();
    if(this.tokenService.getToken())
    {
      this.role=this.tokenService.getUser().role;
    }
  
  
  }
  addRegl()
  {
    this.crudApi.choixmenu = 1;
    this.router.navigate(['/addreglements']);

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
  

}
