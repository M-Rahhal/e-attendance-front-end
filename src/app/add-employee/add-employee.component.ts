import {Component, inject, OnInit, signal} from '@angular/core';
import { FormComponent } from './form/form.component';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EmployeeDetails} from "../attendance/attendance.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  imports: [FormComponent, MatCard, DatePipe, MatCardContent]
})
export class AddEmployeeComponent implements OnInit{

  httpClient: HttpClient = inject(HttpClient);

  employeeDetails = signal({
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

  ngOnInit(): void {
    this.getEmployeeDetails();
  }



  getEmployeeDetails() {
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    });
    this.httpClient.get<EmployeeDetails>('http://localhost:8080/employee', {
      headers: header
    }).subscribe({
      next: (resData: any) => {
        this.employeeDetails.set(resData);
      }
    });
  }

}
