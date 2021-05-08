import { Component, OnInit, Inject } from '@angular/core';
import { Article } from '../../model/article';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../service/article.service';
import { NgForm } from '@angular/forms';
import { DepotService } from 'src/app/service/depot.service';
import { TarifService} from '../../service/tarif.service'

import { LdepotService } from 'src/app/service/ldepot.service';
import { Ldepot } from 'src/app/model/ldepot';

import { Depot } from 'src/app/model/depot';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-addl-depot',
  templateUrl: './addl-depot.component.html',
  styleUrls: ['./addl-depot.component.css']
})
export class AddlDepotComponent implements OnInit {

  formData: FormGroup;
  articleList:Article[];
  tarif:any;
  isValid:boolean=true;
  wtotht = 0;
  wtottva = 0;
  wtotttc = 0;
  constructor( public service:LdepotService,private toastr :ToastrService,
        @Inject(MAT_DIALOG_DATA)  public data,
        public dialogRef:MatDialogRef<AddlDepotComponent>,
        private articleService:ArticleService,
        private tarifService :TarifService,
        private depotService:DepotService,public fb: FormBuilder){}
        get f() { return this.formData.controls; }
       

  ngOnInit() {
    if(this.data.ldepotIndex==null)
    {
      this.InfoForm();
    }
    else 
    {
     this.formData =this.fb.group(Object.assign({},this.depotService.list[this.data.ldepotIndex]));
    }
   this.articleService.getAll().subscribe(
      response =>{this.articleList= response;}
     );
}


InfoForm() {
  this.formData = this.fb.group({
      id: null,
      numero :this.data.numl+this.depotService.list.length,
      poids : 0,
      pu : 0,
      tva : 0,
      totht : 0,
      tottva :0,
      totttc :0,
      libart :'',
      codeart :'',
      
    });
  } 


selectPrice(ctrl){
  if(ctrl.selectedIndex == 0){
    this.f['pu'].setValue(0);
    this.f['tva'].setValue(0);
    this.f['libart'].setValue('');
  }
  else{
    this.f['pu'].setValue(this.articleList[ctrl.selectedIndex-1].pv);
    this.f['tva'].setValue(13);
    this.f['libart'].setValue(this.articleList[ctrl.selectedIndex - 1].libelle);
    this.f['codeart'].setValue( this.articleList[ctrl.selectedIndex - 1].code);
  }
  this.cal();
}

cal(){
  this.tarifService.findTarifByInter(this.data.destcode,parseFloat(this.formData.value.poids)).subscribe(
    response =>{this.tarif= response;}
   );
   console.log(this.tarif,this.data.destcode,this.formData.value.poids)
  this.wtotht =  parseFloat((this.tarif.montant).toFixed(3))+parseFloat((this.formData.value.pu).toFixed(3));
  this.wtottva = parseFloat(((this.wtotht * 13)*0.01).toFixed(3)); 
  this.wtotttc = parseFloat((this.wtotht + this.wtottva).toFixed(3));
  this.f['totht'].setValue(this.wtotht);
  this.f['tottva'].setValue(this.wtottva);
  this.f['totttc'].setValue(this.wtotttc);
}

onSubmit() {
 

  if(this.data.ldepotIndex==null)
  {
    this.depotService.list.push(this.formData.value)
    this.dialogRef.close();
  }
  else
{

  this.depotService.list[this.data.ldepotIndex] = this.formData.value;
}
this.dialogRef.close();
}

validateForm(formData:Ldepot){
  this.isValid=true;
 
  
    return this.isValid;
}

}
