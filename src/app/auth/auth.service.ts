import {  HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';
  isLoggedIn: boolean = false;

  httpClient: HttpClient = inject(HttpClient);
  constructor() { 

  }

  login(enteredEmail: string, enteredPassword: string): void {
      this.httpClient.post<AuthResponse>(this.apiUrl , {
        email: enteredEmail,
        password: enteredPassword
      }).subscribe({
        next: (resData: AuthResponse)=>{
          if(resData.status == true && resData.map_properties.token){
            this.isLoggedIn = true;
            localStorage.setItem("token" , resData.map_properties.token);
          }
        }
      });

      console.log(localStorage.getItem("token"));
  }
}
