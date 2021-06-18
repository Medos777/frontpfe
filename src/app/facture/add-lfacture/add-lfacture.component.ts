import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddlDepotComponent } from 'src/app/depot/addl-depot/addl-depot.component';
import { Depot } from 'src/app/model/depot';
import { Ldepot } from 'src/app/model/ldepot';
import { DepotService } from 'src/app/service/depot.service';
import { FactureService } from 'src/app/service/facture.service';
import { LfactureService } from 'src/app/service/lfacture.service';
@Component({
  selector: 'app-add-lfacture',
  templateUrl: './add-lfacture.component.html',
  styleUrls: ['./add-lfacture.component.css']
})
export class AddLfactureComponent implements OnInit {

  formData: FormGroup;
  DepotList:Depot[];
  isValid:boolean=true;
  
  constructor( public service:LfactureService,private toastr :ToastrService,
        @Inject(MAT_DIALOG_DATA)  public data,
        public dialogRef:MatDialogRef<AddlDepotComponent>,
        private depotservice:DepotService,
        private factureService:FactureService,public fb: FormBuilder){}
        get f() { return this.formData.controls; }
       

  ngOnInit() {
    this.depotservice.getDataByIdClient(this.data.idclient).subscribe(
      response =>{
        console.log(response,this.data.idclient);
        this.DepotList= response;}
     );
    if(this.data.lfactureIndex==null)
    {
      this.InfoForm();
    }
    else 
    {
     this.formData =this.fb.group(Object.assign({},this.factureService.list[this.data.lfactureIndex]));
    }
  
   
}


InfoForm() {
  this.formData = this.fb.group({
      id: null,
      numero :this.factureService.list.length+1,
      numdepot:0,
      tva : 0,
      totht : 0,
      tottva :0,
      totttc :0,
      
      
    });
  } 


  selectDepot(ctrl){
  if(ctrl.selectedIndex == 0){
    this.f['totht'].setValue(0);
    this.f['totttc'].setValue(0);
    this.f['tottva'].setValue(0);
    this.f['tva'].setValue(0);

  }
  else{
    this.f['numdepot'].setValue(this.DepotList[ctrl.selectedIndex - 1].numero);
    this.f['totht'].setValue(this.DepotList[ctrl.selectedIndex-1].totht);
    this.f['totttc'].setValue(this.DepotList[ctrl.selectedIndex-1].totttc);
    this.f['tottva'].setValue(this.DepotList[ctrl.selectedIndex-1].tottva);
    let tottva=parseInt(this.formData.value.tottva);
    let totht=parseInt(this.formData.value.totht);
    this.f['tva'].setValue((tottva/totht)*100);
  }
}



onSubmit() {
 

  if(this.data.lfactureIndex==null)
  {
    this.factureService.list.push(this.formData.value)
    this.dialogRef.close();
  }
  else
{

  this.factureService.list[this.data.lfactureIndex] = this.formData.value;
}
this.dialogRef.close();
}


}
