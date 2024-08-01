export interface AllEmployees{
    status: boolean,
    status_code: number,
    map_properties: {
        employees: Array<Employee>
}
}

interface Employee{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    gender: string,
    role: string,
    joiningDate:Date,
    dateOfBirth: Date,
    attendanceList: Array<Attendance>
}

interface Attendance{
    employeeID: number,
    attendaceDate: Date,
    punchList: Array<Punch>
}
interface Punch{
    id: number,
    start: Date,
    end: Date
}

export const defaultEmployeesResponse = {
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
}