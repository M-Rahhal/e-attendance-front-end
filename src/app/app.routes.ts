import { Routes } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "list-employees",
        component: ListEmployeesComponent
    },
    {
        path: "add-employee",
        component: AddEmployeeComponent
    },
    {
        path: "attendance",
        component: AttendanceComponent,

    }
 
];
