import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UserService} from '../../service/user.service'




import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';


import { ReclamationService} from '../../service/reclamation.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {

  submitted=false;
  user: any;


  isValid:boolean = true;

  Date;

  annee  = 0;
  constructor(public service:ReclamationService,
    
    private dialog:MatDialog,public fb: FormBuilder,
    public userService :UserService,
    public tokenService: TokenStorageService,
    public dialogRef:MatDialogRef<AddReclamationComponent>,
    private toastr :ToastrService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe) { }
    get f() { return this.service.dataForm.controls }

    ngOnInit() {
      if(this.tokenService.getToken())
      {
        this.user=this.tokenService.getUser();
        console.log( this.user,this.tokenService.getUser())
      }
      this.Date =  this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
      if (this.service.choixmenu == 'A'){
       this.InfoForm();
       this.service.list = [];
       this.Date=this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd')

       
       
       
       }
      
    
     }
     InfoForm() {
      this.service.dataForm = this.fb.group({
        id :null,
        libelle :'',
        description:'',
        idClient :'',
        libClient :'',
                
        date_recl :null
        
        });
      } 

      onSubmit(){
        console.log(this.service.dataForm.value);
        
        this.f['date_recl'].setValue(this.Date);
        this.f['idClient'].setValue(this.user.id);
        this.f['libClient'].setValue(this.user.nom);

        this.submitted = true;
        if(this.service.dataForm.invalid){
          console.log("invalid")
         return;
        }
        
     
        
        
          this.service.createData(this.service.dataForm.value).
          subscribe( data => {
            this.dialogRef.close();
            this.service.getAll().subscribe(
              response =>{this.service.list = response;}
             );
            this.toastr.success( 'Validation Faite avec Success'); 
            this.router.navigate(['/listreclamation']);
          });
        
 
       }

       updateData()
       {
       
         this.service.updatedata(this.service.dataForm.value.id,this.service.dataForm.value).
         subscribe( data => {
           this.dialogRef.close();
           this.toastr.success( 'Modification Faite avec Success');
          
           this.service.getAll().subscribe(
             response =>{this.service.list = response;}
            );
           this.router.navigate(['/listreclamation']);
         });
       }


      resetForm() {
        this.service.dataForm.reset();
    }
 


}
