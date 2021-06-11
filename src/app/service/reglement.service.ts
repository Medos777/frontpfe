import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Reglement } from '../model/reglement';
declare const Stripe;

@Injectable({
  providedIn: 'root'
})
export class ReglementService {
  private baseUrl = 'http://localhost:8088/api/reglements';
  private stripeUrl = 'http://localhost:8088/api/payment';

  choixmenu : String = 'A';
  list : any[];
  public formData:  FormGroup; 

  public dataForm:  FormGroup; 

  constructor(private http: HttpClient) { }
  redirectToCheckout(id) {
    const stripe = Stripe('pk_test_51Ix0x2IhmzpvuzzgnZ6Oz7d09tYHiVg1qvUUq8OJKDfkwrL95aW6uS0aTSrIGIxizaryFzJ2apjjRyBGkf9C7vKp00yxWnfi15');
   
    window.open('http://localhost:4200/reglements', "_blank");
    stripe.redirectToCheckout({
      sessionId: id,
    });
  }
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }
  pay(info: Object): Observable<any> {

    return this.http.post(`${this.stripeUrl}`, info);
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