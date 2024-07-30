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