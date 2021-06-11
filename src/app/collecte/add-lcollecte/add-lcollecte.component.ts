import { Component, OnInit, Inject } from '@angular/core';
import { Article } from '../../model/article';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../service/article.service';
import { CollecteService } from 'src/app/service/collecte.service';
import { TarifService} from '../../service/tarif.service'

import { LcollectService } from 'src/app/service/lcollecteservice';
import { Lcollecte } from 'src/app/model/lcollecte';


import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-add-lcollecte',
  templateUrl: './add-lcollecte.component.html',
  styleUrls: ['./add-lcollecte.component.css']
})
export class AddLcollecteComponent implements OnInit {

  formData: FormGroup;
  articleList:Article[];
  tarif:any;
  isValid:boolean=true;
  wtotht = 0;
  wtottva = 0;
  wtotttc = 0;
  constructor( public service:LcollectService,private toastr :ToastrService,
        @Inject(MAT_DIALOG_DATA)  public data,
        public dialogRef:MatDialogRef<AddLcollecteComponent>,
        private articleService:ArticleService,
        private tarifService :TarifService,
        private collecteService:CollecteService,public fb: FormBuilder){}
        get f() { return this.formData.controls; }
       

  ngOnInit() {
    if(this.data.lcollecteIndex==null)
    {
      this.InfoForm();
    }
    else 
    {
     this.formData =this.fb.group(Object.assign({},this.collecteService.list[this.data.lcollecteIndex]));
    }
   this.articleService.getAll().subscribe(
      response =>{this.articleList= response;}
     );
}


InfoForm() {
  this.formData = this.fb.group({
      id: null,
      numero :this.collecteService.list.length+1,
      poids : 0,
      pu : 0,
      tva : 0,
      totht : 0,
      tottva :0,
      totttc :0,
      libart :'',
      codeart :'',
      designation:'',
      
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
  this.tarifService.findTarifByInter(this.data.typecorrier,this.data.destcode,parseFloat(this.formData.value.poids)).subscribe(
    response =>{this.tarif= response;}
   );
   console.log(this.data.typecorrier,this.tarif,this.data.destcode,this.formData.value.poids)
  this.wtotht =  parseFloat((this.tarif.montant).toFixed(3))+parseFloat((this.formData.value.pu).toFixed(3));
  this.wtottva = parseFloat(((this.wtotht * 13)*0.01).toFixed(3)); 
  this.wtotttc = parseFloat((this.wtotht + this.wtottva).toFixed(3));
  this.f['totht'].setValue(this.wtotht);
  this.f['tottva'].setValue(this.wtottva);
  this.f['totttc'].setValue(this.wtotttc);
}

onSubmit() {
 

  if(this.data.lcollecteIndex==null)
  {
    this.collecteService.list.push(this.formData.value)
    this.dialogRef.close();
  }
  else
{

  this.collecteService.list[this.data.lcollecteIndex] = this.formData.value;
}
this.dialogRef.close();
}

validateForm(formData:Lcollecte){
  this.isValid=true;
 
  
    return this.isValid;
}

}
