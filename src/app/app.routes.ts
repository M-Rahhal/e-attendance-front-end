import { Routes } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';


export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: "list-employees",
        component: ListEmployeesComponent,
        canActivate:[AuthGuard],
         pathMatch: 'full'
    },
    {
        path: "add-employee",
        component: AddEmployeeComponent,
        canActivate:[AdminGuard],
         pathMatch: 'full'

    },
    {
        path: "attendance",
        component: AttendanceComponent,
        canActivate:[AuthGuard],
         pathMatch: 'full'
    },
    {
        path: '', redirectTo: '/attendance', pathMatch: 'full' 
    },
    {
        path: '**', redirectTo: 'attendance'
    }
 
];
