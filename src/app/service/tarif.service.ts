import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Tarif } from '../model/tarif';

@Injectable({
  providedIn: 'root'
})
export class TarifService {
  private baseUrl = 'http://localhost:8088/api/tarifs';
  choixmenu : string  = 'A';
  listData : Tarif[];

  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }


  
  listBydest(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/dest/${id}`);
  }
 
  getData(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object, iddest :any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${iddest}`, info);
  }
  
  updatedata(id: number, idtr:any,value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${idtr}/${id}`, value);
  }
 
  
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getNumero(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/generationcode/${code}`);
  }
  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }

  findTarifByInter(typecorr:number,codedest: number,poids:number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/calcul/typecorr/${typecorr}/code/${codedest}/poids/${poids}`);
  }
}