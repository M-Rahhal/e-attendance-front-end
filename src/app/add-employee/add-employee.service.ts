import { inject, Injectable } from '@angular/core';
import { AddEmployeeRequest, AddEmployeeResponse } from './add-employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeService {
  

  private url:string = "http://localhost:8080/auth/register"

  httpClient : HttpClient = inject(HttpClient);
  authService :AuthService = inject(AuthService);

  addEmployee(employee: AddEmployeeRequest){
    let header : HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ sessionStorage.getItem("token")
    });

    this.httpClient.post<AddEmployeeResponse>(this.url , employee , {
      headers: header
    }).subscribe({
        next: (resData : AddEmployeeResponse)=>{
          if(resData.status !== true)
            alert("Something wnet wrong");
        }
    });
  }
}
