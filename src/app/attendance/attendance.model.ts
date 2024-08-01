export interface AttendanceResponse{
    status: string,
    tatus_code: number,
    map_properties: {
        attendance: Array<AttendaceElement>
    }
}

export interface AttendaceElement{
        employeeID: 1,
        attendaceDate: Date
        punchList: Array<PunchElement>
}

export interface PunchElement{
    id: 2,
    start: Date,
    end: Date
}

export interface EmployeeDetails{
    status: boolean,
    status_code: number,
    map_properties: {
        employee: {
            id: number,
            firstName: string,
            lastName: string,
            email: string,
            phoneNumber: string,
            gender: string,
            role: string,
            joiningDate: Date,
            dateOfBirth: Date,
            attendanceList: any
        }
    }
}