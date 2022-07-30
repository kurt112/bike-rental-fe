export interface CustomerCreate {
    user: UserCreate,
    toPay: number,
    isMember: boolean,
}

// lastBilled: Date,
//     nextBilled: Date,
//     createdAt: Date,
//     updatedAt: Date,

// id:number,
export const customerColumns:string[] = ['First Name', 'Last Name', 'Email', 'Cellphone','Birthdate', 'Gender', 'Last Billed', 'Next Billed', 'Balance', 'Profile'];
