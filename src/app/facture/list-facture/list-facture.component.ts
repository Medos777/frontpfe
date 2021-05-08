import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Depot } from 'src/app/model/depot';
import { Facture } from 'src/app/model/facture';
import { FactureService } from 'src/app/service/facture.service';
@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements OnInit {

  list: Facture[];
  SearchText: string;
  constructor(private service: FactureService, private router: Router,
    private toastr: ToastrService, public fb: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit() {

    this.refreshListe();

  }
  refreshListe() {
    this.service.getAll().subscribe(
      response => { this.list = response; }
    );

  }


  onDelete(id: number) {

    if (window.confirm('Are sure you want to delete this ?')) {
      this.service.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            this.refreshListe();
          },
          error => console.log(error));
    }
  }
  newFacture() {
    this.service.choixmenu = 1
    this.router.navigate(['/addfactures']);
  }
  searchByLib(){
    if(this.SearchText=='')
    this.refreshListe();
    else{
      this.service.getDataByLib(this.SearchText).subscribe(
        response =>{this.list = response;}
       );
    }

    
  }
  onSelect(item: Facture) {
    this.service.formData = this.fb.group(Object.assign({}, item));
    this.service.choixmenu = 2
    this.router.navigate(['/addfactures']);
  }
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
