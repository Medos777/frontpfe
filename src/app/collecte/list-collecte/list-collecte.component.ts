import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { CollecteService } from 'src/app/service/collecte.service';

import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { Collecte } from 'src/app/model/collecte';

@Component({
  selector: 'app-list-collecte',
  templateUrl: './list-collecte.component.html',
  styleUrls: ['./list-collecte.component.css']
})
export class ListCollecteComponent implements OnInit {

  role: any;
  user: any;
  list : Collecte[];
  SearchText :string;
  constructor( private service :CollecteService,private router:Router,private tokenService: TokenStorageService,
    
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe) { }

  ngOnInit() {
    if(this.tokenService.getToken())
    {
      this.role=this.tokenService.getUser().role;
      this.user=this.tokenService.getUser();
    }
    console.log(this.role);
    this.refreshListe();
    
  }
refreshListe(){
  if(this.role=="agent"){

 
  this.service.getAll().subscribe(
    response =>{this.list = response;
      console.log(response);
    }
   );
  }
  else if(this.role=="client"){
    this.service.getDataByIdClient(this.user.id).subscribe(
      response => { this.list = response; }
    );
  }

}


  onDelete(id: number) {
   
    if (window.confirm('Are sure you want to delete this ?')) {
      this.service.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!'); 
            this.refreshListe();
          },
          error => console.log(error));
    }
  }
  newCollecte()
  {
    this.service.choixmenu =1
  this.router.navigate(['/addcollectes']);
  }
  searchByLib(){
    if(this.SearchText=='')
    this.refreshListe();
    else{
      if (this.role=="agent")
      {
      this.service.getDataByLib(this.SearchText).subscribe(
        response =>{this.list = response;}
       );
      }
       else 
       {
        this.service.getDataByLibandClient(this.SearchText,this.user.id).subscribe(
          response =>{this.list = response;}
         );

       }
    }

    
  }
onSelect(item :Collecte){
  this.service.formData = this.fb.group(Object.assign({},item));
  this.service.choixmenu =2
  this.router.navigate(['/addcollectes']);
}
transformDate(date){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}


}
