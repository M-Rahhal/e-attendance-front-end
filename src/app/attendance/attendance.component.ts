import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AttendaceElement, AttendanceResponse, EmployeeDetails} from './attendance.model';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatCardModule, MatButton],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent implements OnInit {
  httpClient: HttpClient = inject(HttpClient);
  private url: string = "http://localhost:8080/attendance/employee/week";


  weekEdges: WritableSignal<{ start_date: Date, end_date: Date }> = signal<{
    start_date: Date,
    end_date: Date
  }>(this.getCurrentWeekDates());

  response ?: AttendanceResponse;
  rendered = signal<boolean>(false);

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

  ngOnInit(): void {
    this.getAttendance();
    this.getEmployeeDetails();
  }

  getAttendance() {
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    });
    this.httpClient.post<AttendanceResponse>(this.url, this.weekEdges(), {
      headers: header
    }).subscribe({
      next: (resData: AttendanceResponse) => {
        this.response = resData;
        this.rendered.set(true);
      }
    });
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


  createPunch() {
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    });

    this.httpClient.post('http://localhost:8080/punch/create', {}, {
      headers: header
    }).subscribe({
        next: () => {
          this.rendered.set(false);
          this.getAttendance();
        }
      }
    );
  }

  getCurrentWeekDates(): { start_date: Date; end_date: Date } {
    const today = new Date();

    const currentDayOfWeek = today.getDay();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentDayOfWeek + 1) % 7);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return {start_date: startOfWeek, end_date: endOfWeek};
  }

  getWeekDates(today: Date): { start_date: Date; end_date: Date } {

    const currentDayOfWeek = today.getDay();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentDayOfWeek + 1) % 7);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return {start_date: startOfWeek, end_date: endOfWeek};
  }

  getAttendancesBasedOnDay(day: string): Array<AttendaceElement> | undefined {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let list = this.response?.map_properties.attendance.filter((d) => {
      let date = new Date(d.attendaceDate);
      if (days[date.getDay()] === day)
        return true;
      return false;
    });
    return list;
  }

  changeWeek(direction: "next" | "prev") {
    if (direction === "next") {
      const futureDate = new Date(this.weekEdges().start_date.getTime());
      futureDate.setDate(this.weekEdges().start_date.getDate() + 7);
      this.weekEdges.set(this.getWeekDates(futureDate));
      this.rendered.set(false);
      this.getAttendance();
    } else {
      const futureDate = new Date(this.weekEdges().start_date.getTime());
      futureDate.setDate(this.weekEdges().start_date.getDate() - 7);
      this.weekEdges.set(this.getWeekDates(futureDate));
      this.rendered.set(false);
      this.getAttendance();
    }
  }

  getReport() {
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    });

    this.httpClient.post('http://localhost:8080/e-attendance/report', this.weekEdges(), {
      responseType: 'blob',
      headers: header
    }).subscribe({
        next: (blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
        }
      }
    );
  }

}
