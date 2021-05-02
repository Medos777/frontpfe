import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Ldepot} from '../model/ldepot';

@Injectable({
  providedIn: 'root'
})
export class LdepotService {
  private baseUrl = 'http://localhost:8088/api/ldepot';
  ldepot : Ldepot = new Ldepot();
 lDepotList : any[];

 constructor(private http: HttpClient) { }
 addLDepot(info: Object): Observable<Object> {
   return this.http.post(`${this.baseUrl}`, info);
 }


getAll(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/${id}`);
}
 
}