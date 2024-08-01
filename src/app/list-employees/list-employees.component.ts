import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { AllEmployees, defaultEmployeesResponse } from './list-employees.model';
import { single } from 'rxjs';
import { HttpClient  , HttpHeaders} from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [CommonModule],
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
  httpClient: HttpClient = inject(HttpClient);
  url = "http://localhost:8080/attendance/all-employees"

  ngOnInit(): void {
    this.getEmployees();
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
