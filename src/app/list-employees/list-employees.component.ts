import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { AllEmployees, defaultEmployeesResponse } from './list-employees.model';
import { single } from 'rxjs';
import { HttpClient  , HttpHeaders} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {EmployeeDetails} from "../attendance/attendance.model";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css'
})
export class ListEmployeesComponent implements OnInit{
  allEmployeesResponse : WritableSignal<AllEmployees>  = signal<AllEmployees>({
    status: false,
    status_code: 500,
    map_properties: {
        employees: [
            {
                id: 1,
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                gender: "",
                role: "",
                joiningDate: new Date(),
                dateOfBirth: new Date(),
                attendanceList: [
                    {
                        employeeID: 1,
                        attendaceDate: new Date(),
                        punchList: [
                            {
                                id: 1,
                                start: new Date(),
                                end: new Date
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

  emplyeeDetails = signal({
    status: false,
    status_code: 500,
    map_properties: {
      employee: {
        id: 1,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        role: "=",
        joiningDate: new Date(),
        dateOfBirth: new Date(),
        attendanceList: undefined
      }
    }
  });

  httpClient: HttpClient = inject(HttpClient);
  url = "http://localhost:8080/attendance/all-employees"

  ngOnInit(): void {
    this.getEmployees();
    this.getEmployeeDetails()
  }

  getEmployeeDetails() {
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    });
    this.httpClient.get<EmployeeDetails>('http://localhost:8080/employee', {
      headers: header
    }).subscribe({
      next: (resData: any) => {
        this.emplyeeDetails.set(resData);
      }
    });
  }

  getEmployees(){
    let header : HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ sessionStorage.getItem("token")
    });
    this.httpClient.get<AllEmployees>(this.url , {headers:header}).subscribe({
      next : (response: AllEmployees) => {
        this.allEmployeesResponse.set(response);
      }
    });
  }

}
