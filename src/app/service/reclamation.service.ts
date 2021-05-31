import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
declare const Stripe;

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private baseUrl = 'http://localhost:8088/api/reclamations';
  choixmenu : String = 'A';
  list : any[];

  public dataForm:  FormGroup; 

  constructor(private http: HttpClient) { }

 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }
  getDataByLib(lib: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/lib/${lib}`);
  }
  getDataByClient(id: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/client/${id}`);
  }
  
  
  
  createData(info: Object): Observable<Object> {

    return this.http.post(`${this.baseUrl}`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   console.log(id);
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });

  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }

 
}