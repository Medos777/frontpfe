import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UserService} from '../../service/user.service'
import { TarifService} from '../../service/tarif.service'
import { DestinationService} from '../../service/destination.service'
import { CompteurService} from '../../service/compteur.service';



import { User} from '../../model/User';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Depot } from '../../model/depot';
import { Tarif } from '../../model/tarif';

import { DepotService} from '../../service/depot.service';
import { LdepotService} from '../../service/ldepot.service';
import { DatePipe } from '@angular/common';
import { AddlDepotComponent } from '../../depot/addl-depot/addl-depot.component';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Observable } from "rxjs";
import { Article} from '../../model/article';
import { Ldepot} from '../../model/ldepot';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-add-depot',
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.css']
})
export class AddDepotComponent implements OnInit {
  numligne:number=1;

  ClientList: any[];
  destinationList:any[];
  compteur : any={};

  isValid:boolean = true;
  destinationCode:number;
  articleService: any;
  Date;
  client   : any= {};
  tarif   : any= {};

  annee  = 0;
  constructor(public service:DepotService,
    
    public LdepotService:LdepotService,
    private dialog:MatDialog,public fb: FormBuilder,
    public userService :UserService,
    private toastr :ToastrService,

    private tarifService :TarifService,
    private destinationService :DestinationService,
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
        this.LdepotService.getAll(this.service.formData.value.numero).subscribe(
        response =>{this.service.list = response}
        );
        this.f['date_mvt'].setValue(this.service.formData.value.date_mvt);
       }
   
   this.userService.listUserByRole('client').subscribe(
     response =>{this.ClientList = response;}
    );
    this.destinationService.getAll().subscribe(
      response =>{this.destinationList = response;}
     );

    
     }
   
   
     
   
   

       
   InfoForm() {
       this.service.formData = this.fb.group({
         id :null,
         annee : 0,
         numero : 0,
         date_mvt : '',
         idclient : 0,
         libclient : '',
         totht : 0,
         tottva : 0,

         totttc : 0,
         total:0,
         beneficier:'',
         telbeneficier:0,
         adressebeneficier:'',
         destinationLibelle:'',
         destinationId:0,
         ldepots :[],
         });
       } 
     
   resetForm() {
         this.service.formData.reset();
     }
   
   AddData(ldepotIndex,Id){  
       const dialogConfig = new MatDialogConfig();
       dialogConfig.autoFocus = true;
       dialogConfig.disableClose = true;
       dialogConfig.width="50%";
       let destcode=this.destinationCode;
       let numl=this.numligne
       dialogConfig.data={ldepotIndex,Id,destcode,numl};
       this.numligne= this.numligne+1

       
       this.dialog.open(AddlDepotComponent, dialogConfig).afterClosed().subscribe(b10=>{
         this.calcul();
       });
     }
   
     
   onDelete(item : Ldepot,Id:number,i:number){
       if(Id != null)
       this.service.formData.value.id+=Id ;
      this.service.list.splice(i,1);
      this.calcul();
      }
   
   calcul(){
     
     this.f['totht'].setValue(this.service.list.reduce((prev, curr) => {
       return prev + curr.totht;
     }, 0));
     this.f['tottva'].setValue(this.service.list.reduce((prev, curr) => {
       return prev + curr.tottva;
     }, 0));
     this.f['totttc'].setValue(this.service.list.reduce((prev, curr) => {
       return prev + curr.totttc;
     }, 0));   
     
      }
   validateForm(){
        this.isValid = true ;
       
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
     let numd=this.compteur.annee*10000+this.compteur.numdepot;
     this.f['numero'].setValue(numd);
     }
  );  
} 
   onSubmit(){
    this.f['total'].setValue(this.service.formData.value.totttc);

       this.f['ldepots'].setValue(this.service.list);
       console.log(this.service.formData.value);

         this.service.createData(this.service.formData.value).
         subscribe( data => {
           this.toastr.success( 'Validation Faite avec Success'); 
           this.router.navigate(['/depots']);
         });
      }
     
   transformDate(date){
        return this.datePipe.transform(date, 'yyyy-MM-dd');
      }
      destinationId
      OnSelectDest(ctrl){
        if(ctrl.selectedIndex == 0){
          this.f['destinationId'].setValue('');
          this.f['destinationLibelle'].setValue('');
         }
         else{
            this.f['destinationId'].setValue(this.destinationList[ctrl.selectedIndex - 1].id);
            this.f['destinationLibelle'].setValue(this.destinationList[ctrl.selectedIndex - 1].libelle);
            this.destinationCode=this.destinationList[ctrl.selectedIndex - 1].code;
         }
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
