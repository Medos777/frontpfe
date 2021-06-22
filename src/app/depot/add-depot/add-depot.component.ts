import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UserService} from '../../service/user.service'
import { TarifService} from '../../service/tarif.service'
import { DestinationService} from '../../service/destination.service'
import { CompteurService} from '../../service/compteur.service';
var checkdigit = require('checkdigit');



import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';


import { DepotService} from '../../service/depot.service';
import { LdepotService} from '../../service/ldepot.service';
import { DatePipe } from '@angular/common';
import { AddlDepotComponent } from '../../depot/addl-depot/addl-depot.component';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Ldepot} from '../../model/ldepot';
@Component({
  selector: 'app-add-depot',
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.css']
})
export class AddDepotComponent implements OnInit {
  numligne:number=1;
  assure:boolean=false;


  ClientList: any[];
  destinationList:any[];
  compteur : any={};

  isValid:boolean = true;
  destinationCode:number;
  articleService: any;
  Date;

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
      console.log(checkdigit.mod10.create('234567') )

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
        
                  this.LdepotService.getAllByNumero(this.service.formData.value.numero).subscribe(
        response =>{
          console.log(response);
          this.service.list = response}
        );
        this.f['date_mvt'].setValue(this.service.formData.value.date_mvt);
       }
   
   this.userService.listUserByRole('client').subscribe(
     response =>{this.ClientList = response;}
    );
    this.destinationService.getAll().subscribe(
      response =>{this.destinationList = response;
       
      }
     );

    
     }
   
   
     
   
   

       
   InfoForm() {
       this.service.formData = this.fb.group({
         id :null,
         annee : 0,
         numero : 0,
         libelle:'',
         date_mvt : '',
         idclient : 0,
         libclient : '',
         totht : 0,
         tottva : 0,

         totttc : 0,
         beneficier:'',
         telbeneficier:0,
         adressebeneficier:'',
         emailbeneficier:'',
         destinationLibelle:'',
         indemnisation:0,
         assure:false,
         destinationId:0,
         typecorr:'',
         codebarre:619199123456,


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
       for(let dest of this.destinationList ){
        if (dest.id==this.service.formData.value.destinationId)
        this.destinationCode=dest.code;
      }
       let destcode=this.destinationCode;
       let numl=this.numligne
       let typecorrier=this.service.formData.value.typecorr;
       console.log(typecorrier);
       dialogConfig.data={typecorrier,ldepotIndex,Id,destcode,numl};
       this.numligne= this.numligne+1

       
       this.dialog.open(AddlDepotComponent, dialogConfig).afterClosed().subscribe(b10=>{
         this.calcul();
       });
     }
   
     onChangeAssure(event){
      this.service.formData.value.indemnisation=0;
       console.log(event)
       if(event.checked)
         this.assure=true;
       else  
       {
         this.assure=false;
        
       }

     }
   onDelete(item : Ldepot,Id:number,i:number){
       if(Id != null)
       this.service.formData.value.id+=Id ;
      this.service.list.splice(i,1);
      this.LdepotService.deleteData(item.id).subscribe(
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
        let dated= new Date(this.service.formData.value.date_mvt);
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
     let numd=this.compteur.annee*10000+this.compteur.numdepot;
     this.f['numero'].setValue(numd);
     }
  );  
} 
   onSubmit(){
this.generatecodebaree()
       this.f['ldepots'].setValue(this.service.list);
       console.log(this.service.formData.value);
if(this.validateForm()){

  this.service.createData(this.service.formData.value).
  subscribe( data => {
    this.toastr.success( 'Validation Faite avec Success'); 
    this.router.navigate(['/depots']);
  });
  this.service.list = [];
}

      }
  generatecodebaree() {
    let code=(619199*1000000)+this.compteur.numdepot;
    
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
