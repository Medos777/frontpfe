import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepotService } from 'src/app/service/depot.service';
import { Depot } from 'src/app/model/depot';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Component({
  selector: 'app-listl-depot',
  templateUrl: './listl-depot.component.html',
  styleUrls: ['./listl-depot.component.css']
})
export class ListlDepotComponent implements OnInit {

  list : Depot[];
  SearchText :string;
  constructor( private service :DepotService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe) { }

  ngOnInit() {
    
    this.getData();
    
  }
getData(){
  this.service.getAll().subscribe(
    response =>{this.list = response;}
   );

}



 
selectDepot(item :Depot){
  this.service.formData = this.fb.group(Object.assign({},item));
  
  this.router.navigate(['/depots']);
}



    
      onDelete(id: number) {
        if (window.confirm('Are sure you want to delete this ?')) {
        this.service.deleteData(id)
          .subscribe(
            data => {
              console.log(data);
              this.toastr.success(' data successfully deleted!'); 
              this.getData();
            },
            error => console.log(error));
      }
      }
      
      newDepot()
      {
        this.service.choixmenu = 1
        this.router.navigate(['depots']);
      }
  
     
  
      onSelect(item : Depot) {
        this.service.choixmenu = 2;
       this.service.formData = this.fb.group(Object.assign({},item));
     
        this.router.navigate(['/depots']);
      }
  
     
  
      transformDate(date){
        return this.datePipe.transform(new Date, 'yyyy-MM-dd');
      }






}
