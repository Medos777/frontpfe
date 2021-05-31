import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UserService} from '../../service/user.service'
import { FactureService} from '../../service/facture.service'




import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';


import { ReglementService} from '../../service/reglement.service';
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
  constructor(public service:ReglementService,
    
    private dialog:MatDialog,public fb: FormBuilder,
    public userService :UserService,
    public factureService :FactureService,
    
    private toastr :ToastrService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls }

    ngOnInit() {
      console.log("ng oninit");

      this.Date =  this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
      if (this.service.choixmenu == 'A'){
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
        numerofacture :0,
        idclient :'',
        date_Paiement :null
        
        });
      } 

      onSubmit(){
        console.log(this.service.formData.value);
        
        this.f['date_Paiement'].setValue(this.Date);
        this.submitted = true;
        if(this.service.formData.invalid){
          console.log("invalid")
         return;
        }
        
     
        this.service.redirectToCheckout();
        console.log("hey")

          this.service.createData(this.service.formData.value).
          subscribe( data => {
            this.toastr.success( 'Validation Faite avec Success'); 
            this.router.navigate(['/reglements']);
          });
        
 
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
