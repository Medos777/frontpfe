import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8088/api/users';
  choixmenu : string  = 'A';
  list : any;
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) {}
  addUser(user: User) {
    return this.http.post(`${this.baseUrl}/addUser`, user);
  }
  listUser() :Observable<Object> {
    return this.http.get(`${this.baseUrl}/all`);
  }
  listUserByRole( role:String) :Observable<Object> {
    return this.http.get(`${this.baseUrl}/findUser/${role}`);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, { responseType: 'text' });
  }
  deleteUser(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`, { responseType: 'text' });
  }
}
