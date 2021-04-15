import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tarif } from 'src/app/model/tarif';
import { Destination } from 'src/app/model/destination';
import { DestinationService } from 'src/app/service/destination.service';
import { TarifService } from 'src/app/service/tarif.service';

@Component({
  selector: 'app-add-tarif',
  templateUrl: './add-tarif.component.html',
  styleUrls: ['./add-tarif.component.css']
})
export class AddTarifComponent implements OnInit {

  DestinationList: Destination[];
  submitted=false;
  listtarif:Tarif[];
  constructor(public crudApi:TarifService  ,public fb: FormBuilder,public toastr: ToastrService,
    
    public destinationService: DestinationService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddTarifComponent>,
    
    ) { }

  ngOnInit() {
    this.getData();
    if (this.crudApi.choixmenu == "A")
    {this.infoForm();}
    else 
    {
      this.crudApi.dataForm.addControl('iddest', new FormControl('', Validators.required));
    }
    this.destinationService.getAll().subscribe(
      response =>{this.DestinationList = response;}
     );
   }

get f(){
  return this.crudApi.dataForm.controls;
}
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        deb: [, [Validators.required]],
        fin: [, [Validators.required]],
        montant: [, [Validators.required]],
        iddest: [, [Validators.required]],
      
      });
    }
   
   

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  
  onSubmit() {
    this.submitted = true;
    if(this.crudApi.dataForm.invalid){
     return;

    }
   
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
      
     this.updateData()
    }
   
}
getData() {
  this.crudApi.getAll().subscribe(
     response =>{this.listtarif = response;}
    );
 
 
 }
 OnSelectDest(ctrl){
  if(ctrl.selectedIndex==0)
  {
   

    this.f['iddest'].setValue('');

  }
  else{
    let num:number;
    let code:any;
  code=this.DestinationList[ctrl.selectedIndex-1].code;
  this.crudApi.getNumero(code).subscribe(
 reponse=>{
   num=reponse+1;
 
   this.f['code'].setValue(num);
 }


  );

  }

}
veriflib(lib):boolean{
  for(let elem of this.listtarif ){
    if (elem.libelle==lib)
    return false
  }
  
return true;
}
addData() {
  let lib:String=this.crudApi.dataForm.value.libelle;
  if(this.veriflib(lib))
  {
    this.crudApi.createData(this.crudApi.dataForm.value,this.crudApi.dataForm.value['iddest']).
    subscribe( data => {
      this.dialogRef.close();
      
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/tarifs']); 
    });
  }
 
}
  updateData()
  {
    console.log(this.crudApi.dataForm.value);

    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value['iddest'],this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/tarifs']); 
    });
  }
}
