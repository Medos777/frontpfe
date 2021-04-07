import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public baseUrl = 'http://localhost:8088/api/articles';
  choixmenu : string  = 'A';
  listData : Article[];
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }


  
  listScateg(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/scateg/${id}`);
  }
 
  getData(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(formData: FormData, idscat :any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${idscat}`, formData);
  }
  
  updatedata(id: number,idcsat:any ,value: Object ): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${idcsat}/${id}`, value);
  }
 
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }
  getNumero(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/generationcode/${id}`);
  }
}