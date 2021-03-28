import { Injectable } from '@angular/core';
import { async } from 'q';
const toke_key = 'auth-token';
const user_key = 'auth-user';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut = async () => {
    await window.sessionStorage.clear();
    console.log('deconnecter avec success');
  };
  public saveToken(token: string) {
    window.sessionStorage.removeItem(toke_key);
    window.sessionStorage.setItem(toke_key, token);
  }
  getToken(): string {
    return sessionStorage.getItem(toke_key);
  }
  public saveUser(user) {
    window.sessionStorage.removeItem(user_key);
    window.sessionStorage.setItem(user_key, JSON.stringify(user));
  }
  public getUser() {
    return JSON.parse(sessionStorage.getItem(user_key));
  }
}
