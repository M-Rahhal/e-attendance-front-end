export interface AddEmployeeRequest{
    first_name: string,
    last_name: string,
    email:string,
    password: string,
    phone_number: string,
    gender: string,
    role: string,
    date_of_birth: string 
}
export interface AddEmployeeResponse{
    status:boolean,
    status_code: number,
    map_properties:{}|null
}