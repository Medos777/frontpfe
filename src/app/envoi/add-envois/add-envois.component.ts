import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompteurService } from 'src/app/service/compteur.service';
import { EnvoiService } from 'src/app/service/envoi.service';
import { DepotService } from 'src/app/service/depot.service';
import { LdepotService} from '../../service/ldepot.service';

import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-add-envois',
  templateUrl: './add-envois.component.html',
  styleUrls: ['./add-envois.component.css']
})
export class AddEnvoisComponent implements OnInit {

  compteur : any={};

  isValid:boolean = true;
  appear:boolean=false;
  intern:boolean=false;

  
  Date;
 

  annee  = 0;
  constructor(public service:EnvoiService
    ,public depotservice:DepotService,
    public LdepotService:LdepotService,

    private dialog:MatDialog,public fb: FormBuilder,
    public userService :UserService,
    private toastr :ToastrService,
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
      
   
   

    
     }
     InfoForm() {
      this.service.formData = this.fb.group({
        id :null,
        annee : 0,
        numero : 0,

        date_envoi: '',
        numerovol : '',
        date_vol:'',
        numdepot:0,
        idclient : 0,
        beneficier:'',
        telbeneficier:'',
        adressebeneficier : 0,
        clientlib:'',
        totht : 0,
        tottva : 0,

        totttc : 0,
       
        });
      } 
    
  resetForm() {
        this.service.formData.reset();
    }
    onSelectCompteur(annee: number)
    {
     this.compteurService.getDatabyAnnee(annee).subscribe(
       response =>{
         this.compteur = response;
         let nume=this.compteur.annee*10000+this.compteur.numenvoi;
         this.f['numero'].setValue(nume);
         }
      );  
    } 
    validateForm(){
      this.isValid = true ;
      let dated= new Date(this.service.formData.value.date_envoi);
      let currdate=new Date(Date.now());
      console.log(dated)

      if (currdate.getTime() < dated.getTime()) 
      this.isValid =false;
     
      return this.isValid;
    }

       onSubmit(){
    
           console.log(this.service.formData.value);
    if(this.validateForm()){
      this.service.createData(this.service.formData.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success'); 
        this.router.navigate(['/envois']);
      });
      this.service.list = [];
    }
            
          }
         
       transformDate(date){
            return this.datePipe.transform(date, 'yyyy-MM-dd');
          }
          
      
          onCodebarre(code){
            this.appear=false;
            this.intern=false;

            console.log(code.value.length);
            if(code.value.length==12){
              this.appear=true;

              this.depotservice.getDataByCodeb(code.value).subscribe( data => {


                
                
                if(data.destinationLibelle=="Tunisie"){
                  this.intern=true;

                }
                this.f['clientlib'].setValue(data.libclient);
                this.f['numdepot'].setValue(data.numero);
                this.f['beneficier'].setValue(data.beneficier);
                this.f['telbeneficier'].setValue(data.telbeneficier);
                this.f['adressebeneficier'].setValue(data.adressebeneficier);

                this.f['totht'].setValue(data.totht);
                this.f['tottva'].setValue(data.tottva);
                this.f['totttc'].setValue(data.totttc);
                this.LdepotService.getAllByNumero(this.service.formData.value.numdepot).subscribe(
                  response2 =>{
                    console.log(this.service.formData.value.numdepot,response2);
                    this.depotservice.listldep = response2}
                  );
              });

            }

          }
}
