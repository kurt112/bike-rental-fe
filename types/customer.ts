import {UserCreate} from "./user";

export interface CustomerCreate {
    user: UserCreate | undefined,
    toPay: number,
    isMember: boolean,
    isActive: boolean
}

// 'Next Billed',
export const customerColumns:string[] = ['First Name', 'Last Name', 'Email', 'Cellphone','Birthdate', 'Gender', 'Last Billed', 'To Pay', 'Profile'];
