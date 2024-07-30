import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { AttendaceElement, AttendanceResponse} from './attendance.model';
import {MatTableModule} from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [MatTableModule , CommonModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent implements OnInit{
  httpClient:HttpClient = inject(HttpClient);
  private url:string = "http://localhost:8080/attendance/employee/week";

  response ?: AttendanceResponse;

  redered = signal<boolean>(false);
  ngOnInit(): void {
    this.getAttendance();
  }

  getAttendance(){
    let header : HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ sessionStorage.getItem("token")
    });
    this.httpClient.post<AttendanceResponse>(this.url  ,this.getCurrentWeekDates() ,{
      headers: header
    }).subscribe({
        next: (resData: AttendanceResponse)=>{
          this.response = resData;
          this.redered.set(true);
        }
    });
  }


  createPunch(){
    let header : HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ sessionStorage.getItem("token")
    });

    this.httpClient.post('http://localhost:8080/punch/create'  ,{} ,{
      headers: header
    }).subscribe({
        next: ()=>{
          this.redered.set(false);
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

    return { start_date:startOfWeek, end_date:endOfWeek };
}

getAttendancesBasedOnDay(day: string) : Array<AttendaceElement> | undefined {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let list =  this.response?.map_properties.attendance.filter((d)=>{
      let date = new Date(d.attendaceDate);
        if(days[date.getDay()] === day)
          return true;
        return false;
    });
    return list;
}

}
