import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LoginComponent } from './login/login.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AddEmployeeComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'attendance-front-end';
}
