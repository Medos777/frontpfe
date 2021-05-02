import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Depot } from 'src/app/model/depot';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';
import { DepotService } from 'src/app/service/depot.service';

import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
@Component({
  selector: 'app-list-depot',
  templateUrl: './list-depot.component.html',
  styleUrls: ['./list-depot.component.css']
})
export class ListDepotComponent implements OnInit {

  list : Depot[];
  SearchText :string;
  constructor( private service :DepotService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe) { }

  ngOnInit() {
    
    this.refreshListe();
    
  }
refreshListe(){
  this.service.getAll().subscribe(
    response =>{this.list = response;}
   );

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
  newDepot()
  {
    this.service.choixmenu =1
  this.router.navigate(['/adddepot']);
  }

onSelect(item :Depot){
  this.service.formData = this.fb.group(Object.assign({},item));
  this.service.choixmenu =2
  this.router.navigate(['/adddepot']);
}
transformDate(date){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}


}
