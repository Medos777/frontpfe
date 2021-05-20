import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private baseUrl = 'http://localhost:8088/api/depots';
  choixmenu : number = 1;
  list : any[];
  public formData:  FormGroup; 

  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }
  getDataByIdClient(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/client/${id}`);
  }
  getDataByLib(lib: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/lib/${lib}`);
  }
  getDataByLibandClient(lib: string,id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/libclient/${lib}/${id}`);
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

 
}