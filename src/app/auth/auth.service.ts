import {  HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { AuthResponse } from './auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';
  isLoggedIn: WritableSignal<boolean> = signal<boolean>(sessionStorage.getItem("loogedIn")==="true" ? true :false);
  token !: string;
  role: WritableSignal<string> = signal("employee");

  router :Router = inject(Router);
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
            this.isLoggedIn.set(true);
            sessionStorage.setItem("token" ,resData.map_properties.token);
            sessionStorage.setItem("loggedIn" , "true");
            sessionStorage.setItem("role" , resData.map_properties.role);
            this.token = resData.map_properties.token;
            this.role.set(resData.map_properties.role);
            this.router.navigate(['/attendance']);
          }
        }
      });
  }

  logout(){
    this.token = "";
    sessionStorage.clear();
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
