import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lreglement } from '../model/lreglement';

@Injectable({
  providedIn: 'root'
})
export class LreglementService {
  private baseUrl = 'http://localhost:8088/api/lreglements';
 lDepotList : any[];

 constructor(private http: HttpClient) { }



 getAllById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/id/${id}`);
}
 

deleteData(id: number): Observable<any> {
   
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}
 
}