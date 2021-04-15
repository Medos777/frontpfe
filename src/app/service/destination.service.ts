import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination} from '../model/destination'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class DestinationService  {
  
  private baseUrl = 'http://localhost:8088/api/destinations';
  choixmenu : string  = 'A';
  list : Destination[];
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }
  getDataByCode(code: String): Observable<Object> {
    return this.http.get(`${this.baseUrl}/code/${code}`);
  }
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }

  getCode(): Observable<any> {
    return this.http.get(`${this.baseUrl}/generationcode/`);
  }
}