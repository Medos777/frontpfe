import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Facture } from 'src/app/model/facture';
import { Reglement } from 'src/app/model/reglement';

import { Lreglement } from 'src/app/model/lreglement';
import { ReglementService } from 'src/app/service/reglement.service';
import { FactureService } from 'src/app/service/facture.service';
import { LreglementService } from 'src/app/service/lreglement.service';
@Component({
  selector: 'app-add-lreglement',
  templateUrl: './add-lreglement.component.html',
  styleUrls: ['./add-lreglement.component.css']
})
export class AddLreglementComponent implements OnInit {
  FactureList:Facture[];
  formData: FormGroup;
  isValid:boolean=true;


  constructor( public service:LreglementService,private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddLreglementComponent>,
    private regservice:ReglementService,
    private factureService:FactureService,public fb: FormBuilder){}
    get f() { return this.formData.controls; }
   
  ngOnInit(): void {

    this.factureService.getDataByClientnonpaye(this.data.idclient).subscribe(
      response =>{
        console.log(response,this.data.idclient);
        this.FactureList= response;}
     );
    if(this.data.lreglementIndex==null)
    {
      this.InfoForm();
    }
    else 
    {
     this.formData =this.fb.group(Object.assign({},this.regservice.list[this.data.lreglementIndex]));
    }

  }
  InfoForm() {
    this.formData = this.fb.group({
        id: null,
        numerofacture:0,
        totht : 0,
        tottva :0,
        totttc :0,
        
        
      });
    } 



    selectReglement(ctrl){
      if(ctrl.selectedIndex == 0){
        this.f['totht'].setValue(0);
        this.f['totttc'].setValue(0);
        this.f['tottva'].setValue(0);
    
      }
      else{
        this.f['numerofacture'].setValue(this.FactureList[ctrl.selectedIndex - 1].numero);
        this.f['totht'].setValue(this.FactureList[ctrl.selectedIndex-1].totht);
        this.f['totttc'].setValue(this.FactureList[ctrl.selectedIndex-1].totttc);
        this.f['tottva'].setValue(this.FactureList[ctrl.selectedIndex-1].tottva);

        
        let tottva=parseInt(this.formData.value.tottva);
        let totht=parseInt(this.formData.value.totht);
      }
    }




    onSubmit() {
 

      if(this.data.lreglementIndex==null)
      {
        this.regservice.list.push(this.formData.value)
        this.dialogRef.close();
      }
      else
    {
    
      this.regservice.list[this.data.lreglementIndex] = this.formData.value;
    }
    this.dialogRef.close();
    }
}
