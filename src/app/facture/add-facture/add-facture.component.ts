import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Lfacture } from 'src/app/model/lfacture';
import { CompteurService } from 'src/app/service/compteur.service';
import { FactureService } from 'src/app/service/facture.service';
import { LfactureService } from 'src/app/service/lfacture.service';
import { TarifService } from 'src/app/service/tarif.service';
import { UserService } from 'src/app/service/user.service';
import { AddLfactureComponent } from '../add-lfacture/add-lfacture.component';
@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent implements OnInit {

  numligne:number=1;

  ClientList: any[];
  compteur : any={};

  isValid:boolean = true;

  Date;
 

  annee  = 0;
  constructor(public service:FactureService,
    
    public LfactureService:LfactureService,
    private dialog:MatDialog,public fb: FormBuilder,
    public userService :UserService,
    private toastr :ToastrService,

    private tarifService :TarifService,
    private compteurService :CompteurService,


    private router :Router,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls }
    ngOnInit() {

      if (this.service.choixmenu == 1){
       this.InfoForm();
       this.service.list = [];
       this.Date = this.transformDate(new Date(Date.now()));
       this.annee = (this.Date).toString().substring(0,4);
       this.f['annee'].setValue(this.annee);
       this.onSelectCompteur(this.annee);
       }
         else
       {
        this.LfactureService.getAllByNumero(this.service.formData.value.numero).subscribe(
        response =>{this.service.list = response}
        );
        this.f['date_fct'].setValue(this.service.formData.value.date_fct);
       }
   
   this.userService.listUserByRole('client').subscribe(
     response =>{this.ClientList = response;}
    );
  

    
     }
   
   
     
   
   

       
   InfoForm() {
       this.service.formData = this.fb.group({
         id :null,
         annee : 0,
         numero : 0,
         libelle : '',

         date_fct : '',
         idclient : 0,
         libclient : '',
         totht : 0,
         tottva : 0,

         totttc : 0,
         total:0,
        
         lfactures :[],
         });
       } 
     
   resetForm() {
         this.service.formData.reset();
     }
   
   AddData(lfactureIndex,Id){  
       const dialogConfig = new MatDialogConfig();
       dialogConfig.autoFocus = true;
       dialogConfig.disableClose = true;
       dialogConfig.width="50%";
       let numl=this.numligne;
       let idclient=this.service.formData.value.idclient;

       dialogConfig.data={lfactureIndex,Id,numl,idclient};
       this.numligne= this.numligne+1

       
       this.dialog.open(AddLfactureComponent, dialogConfig).afterClosed().subscribe(b10=>{
         this.calcul();
       });
     }
   
     
   onDelete(item : Lfacture,Id:number,i:number){
       if(Id != null)
       this.service.formData.value.id+=Id ;
      this.service.list.splice(i,1);
      this.LfactureService.deleteData(item.id).subscribe(
        );
      this.calcul();
      }
   
   calcul(){
     
     this.f['totht'].setValue((this.service.list.reduce((prev, curr) => {
       return prev + curr.totht;
     }, 0)).toFixed(3));
     this.f['tottva'].setValue((this.service.list.reduce((prev, curr) => {
       return prev + curr.tottva;
     }, 0)).toFixed(3));
     this.f['totttc'].setValue((this.service.list.reduce((prev, curr) => {
       return prev + curr.totttc;
     }, 0)).toFixed(3));   
     
      }
   validateForm(){
        this.isValid = true ;
        let dated= new Date(this.service.formData.value.date_fct);
        let currdate=new Date(Date.now());
        console.log(dated)

        if (currdate.getTime() < dated.getTime()) 
        this.isValid =false;
        if(this.service.formData.value.idclient==0)
        this.isValid =false;
       
        else if (this.service.list.length==0)
        this.isValid =false;
        return this.isValid;
      }
   
onSelectCompteur(annee: number)
{
 this.compteurService.getDatabyAnnee(annee).subscribe(
   response =>{
     this.compteur = response;
     let numd=this.compteur.annee*10000+this.compteur.numfacture;
     this.f['numero'].setValue(numd);
     }
  );  
} 
   onSubmit(){

       this.f['lfactures'].setValue(this.service.list);
       console.log(this.service.formData.value);
if(this.validateForm()){
  this.service.createData(this.service.formData.value).
  subscribe( data => {
    this.toastr.success( 'Validation Faite avec Success'); 
    this.router.navigate(['/factures']);
  });
  this.service.list = [];
}
        
      }
     
   transformDate(date){
        return this.datePipe.transform(date, 'yyyy-MM-dd');
      }
      
  
   OnSelectClient(ctrl)
      {
         if(ctrl.selectedIndex == 0){
          this.f['libclient'].setValue('');
          this.f['idclient'].setValue('');
         }
         else{
            this.f['libclient'].setValue(this.ClientList[ctrl.selectedIndex - 1].nom);
            this.f['idclient'].setValue(this.ClientList[ctrl.selectedIndex - 1].id);
         }
       }
      
}
