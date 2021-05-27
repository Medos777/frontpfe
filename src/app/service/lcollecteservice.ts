import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ldepot} from '../model/ldepot';

@Injectable({
  providedIn: 'root'
})
export class LcollectService {
  private baseUrl = 'http://localhost:8088/api/lcollectes';
  ldepot : Ldepot = new Ldepot();
 lDepotList : any[];

 constructor(private http: HttpClient) { }
 addLDepot(info: Object): Observable<Object> {
   return this.http.post(`${this.baseUrl}`, info);
 }


getAllById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/id/${id}`);
}
 
getAllByNumero(num: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/num/${num}`);
}
deleteData(id: number): Observable<any> {
   
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}
}
