import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions={
  headers:new HttpHeaders({'content-Type':'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private baseUrl = 'http://localhost:8088/api/home';
  connected=false;
  loginc=false;
  role = "";
  constructor(private http: HttpClient) { }
  login(username:string,password:string):Observable<any>
  {
   return this.http.post(`${this.baseUrl}/login`,{username,password},httpOptions);
  }

logout(){
  return this.http.post(`${this.baseUrl}/logout`,null);

}
}
