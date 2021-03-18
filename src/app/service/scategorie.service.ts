import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Scategorie } from '../model/scategorie';

@Injectable({
  providedIn: 'root'
})
export class ScategorieService {
  private baseUrl = 'http://localhost:8088/api/scategories';
  choixmenu : string  = 'A';
  listData : Scategorie[];

  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }


  
  listScateg(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/categ/${id}`);
  }
 
  getData(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object, idcat :any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${idcat}`, info);
  }
  
  updatedata(id: number, idsct:any,value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${idsct}/${id}`, value);
  }
 
  updateRang(id: number, value: any): Observable<Object> {
      return this.http.patch(`${this.baseUrl}/${id}`, value);
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
}