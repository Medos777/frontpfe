import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../service/tokenStorage.service';
import { Depot } from 'src/app/model/depot';
import { Envoi} from 'src/app/model/Envoi';
import { DepotService } from 'src/app/service/depot.service';
import { EnvoiService } from 'src/app/service/envoi.service';

@Component({
  selector: 'app-list-envois',
  templateUrl: './list-envois.component.html',
  styleUrls: ['./list-envois.component.css']
})
export class ListEnvoisComponent implements OnInit {

 role: any;
  user: any;
  list: any[];
  SearchText: string;
  constructor(public envoiservice: EnvoiService
    ,private depotService: DepotService,
    private router: Router,private tokenService: TokenStorageService,
    private toastr: ToastrService, public fb: FormBuilder,
    private datePipe: DatePipe) { }
    ngOnInit() {
      if(this.tokenService.getToken())
      {
        this.role=this.tokenService.getUser().role;
        this.user=this.tokenService.getUser();
      }
      console.log(this.role);
      console.log(this.user);
  
      this.envoiservice.getAll().subscribe(
        response => { this.list = response; }
      );  
    }
    
       
      
    
  
  
    onDelete(id: number) {
  
      if (window.confirm('Are sure you want to delete this ?')) {
        this.envoiservice.deleteData(id)
          .subscribe(
            data => {
              console.log(data);
              this.toastr.warning(' data successfully deleted!');
              this.envoiservice.getAll().subscribe(
                response => { this.list = response; }
              );              },
            error => console.log(error));
      }
    }
    newEnvoi() {
      this.envoiservice.choixmenu = 1
      this.router.navigate(['/addenvoi']);
    }
    searchByLib(){
     
    }
    onSelect(item: Envoi) {
      this.envoiservice.formData = this.fb.group(Object.assign({}, item));
      this.envoiservice.choixmenu = 2
      this.router.navigate(['/addenvoi']);
    }
    transformDate(date) {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
   
}
