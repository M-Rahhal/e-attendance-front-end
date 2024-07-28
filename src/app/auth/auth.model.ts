export interface AuthResponse{
    status:boolean,
    status_code: number ,
    map_properties: {
        token: string
    }
};