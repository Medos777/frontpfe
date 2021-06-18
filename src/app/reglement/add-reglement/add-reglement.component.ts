import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UserService} from '../../service/user.service'
import { FactureService} from '../../service/facture.service'
import { HttpClient } from '@angular/common/http';
import { AddLreglementComponent } from '../add-lreglement/add-lreglement.component';
import { Lreglement } from 'src/app/model/lreglement';




import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';


import { ReglementService} from '../../service/reglement.service';
import { LreglementService } from 'src/app/service/lreglement.service'

import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-reglement',
  templateUrl: './add-reglement.component.html',
  styleUrls: ['./add-reglement.component.css']
})
export class AddReglementComponent implements OnInit {

 


  ClientList: any[];
  FactureList: any[];

  submitted=false;


  isValid:boolean = true;

  Date;

  annee  = 0;
  rate_tnd_eur:number;
  constructor(public service:ReglementService,
    private http: HttpClient,
    
    private dialog:MatDialog,public fb: FormBuilder,
    public userService :UserService,
    public factureService :FactureService,
    private lreglementService:LreglementService,
    
    private toastr :ToastrService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls }

    ngOnInit() {
      let tnd_eur ="https://free.currconv.com/api/v7/convert?q=TND_EUR&compact=ultra&apiKey=3915a1ab4e7845edd5ea"
      this.http.get < any > (tnd_eur).subscribe(data => {
        this.rate_tnd_eur=data.TND_EUR*100;
      
      });


      this.Date =  this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
      if (this.service.choixmenu == 1){
       this.InfoForm();
       this.service.list = [];
       this.Date=this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd')

       
       this.userService.listUserByRole('client').subscribe(
        response =>{this.ClientList = response;}
       );

       
       }
       

     }
     InfoForm() {
       console.log("info form");
      this.service.formData = this.fb.group({
        id :null,
        libelle :'',

        numerofacture :0,
        idclient :'',
        date_Paiement :null,
        totht : 0,
        tottva : 0,

        totttc : 0,
        lreglements :[],
        
        
        });
      } 

      AddData(lreglementIndex,Id){  
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = false;
        dialogConfig.width="50%";
        let idclient=this.service.formData.value.idclient;
 
        dialogConfig.data={lreglementIndex,Id,idclient};
 
        
        this.dialog.open(AddLreglementComponent, dialogConfig).afterClosed().subscribe(b10=>{
          this.calcul();
        });
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
      onSubmit(){
        console.log(this.service.formData.value);
        if(this.service.list.length>0){
          this.f['lreglements'].setValue(this.service.list);
          console.log(this.service.formData.value.totttc*this.rate_tnd_eur);
  
          this.f['date_Paiement'].setValue(this.Date);
          this.submitted = true;
          if(this.service.formData.invalid){
            console.log("invalid")
           return;
          }
          const info = {
            name: this.service.formData.value.libelle,
            currency: "EUR",
            cancelUrl: "http://localhost:4200/reglements",
            successUrl: "http://localhost:4200/reglements",
            amount: this.service.formData.value.totttc*this.rate_tnd_eur,
            quantity: '1',
          };
          this.service.pay(info).subscribe( data => {
            this.service.redirectToCheckout(data.id);
          });
         
  
            this.service.createData(this.service.formData.value).
            subscribe( data => {
              this.toastr.success( 'Validation Faite avec Success'); 
              this.router.navigate(['/reglements']);
            });
          
            this.service.list = [];
  
        }
       
       }


       onDelete(item : Lreglement,Id:number,i:number){
        if(Id != null)
        this.service.formData.value.id+=Id ;
       this.service.list.splice(i,1);
       this.lreglementService.deleteData(item.id).subscribe(
         );
       this.calcul();
       }

      resetForm() {
        this.service.formData.reset();
    }
    OnSelectClient(ctrl)
      {
        this.factureService.getDataByClientnonpaye(ctrl.value).subscribe(
          response =>{this.FactureList = response;}
         );  
        this.factureService.getDataByClientnonpaye(this.ClientList[ctrl.selectedIndex - 1].id).subscribe(
          response =>{this.FactureList = response;}
         );
         if(ctrl.selectedIndex == 0){
          this.f['idclient'].setValue('');
         }
         else{
            this.f['idclient'].setValue(this.ClientList[ctrl.selectedIndex - 1].id);
         }
       }




}
