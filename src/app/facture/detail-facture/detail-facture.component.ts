import { Component, OnInit } from '@angular/core';
import { FactureService } from 'src/app/service/facture.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Facture } from 'src/app/model/facture';
import { UserService } from 'src/app/service/user.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-detail-facture',
  templateUrl: './detail-facture.component.html',
  styleUrls: ['./detail-facture.component.css']
})
export class DetailFactureComponent implements OnInit {
facture:any;
client:any;

  constructor(private service: FactureService, private router: Router,
    public userService :UserService,
    )
 { }
  ngOnInit(): void {
    this.facture=this.service.facture;
    console.log(this.facture);
   this.userService.GetUserById(this.facture.idclient).subscribe(
     response =>{this.client = response;}
    );
  }
  printpdf(){
    console.log("in download");

    let data=document.getElementById("formpdf") 
    this.generatePdf(data);
}

generatePdf(htmlContent){
html2canvas(htmlContent).then(canvas =>{
  let imgWidth = 290;
  let imgHeigth = (canvas.height * imgWidth / canvas.width) 
  const contentDataURL =canvas.toDataURL('image/png')
  let pdf = new jsPDF('l','mm','a4');
  var positon= 10;
  pdf.addImage(contentDataURL,'PBG',0,positon,imgWidth,imgHeigth);
  pdf.save('facture.pdf');
})
}

}
