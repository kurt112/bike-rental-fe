import {UserCreate} from "./user";

export interface EmployeeCreate {
    user: UserCreate | undefined
}


export const employeeColumns:string[] = ['First Name', 'Last Name', 'Email', 'Cellphone','Birthdate', 'Gender', 'Profile'];
