export interface BikeObject{
    name: string,
    description: string,
    price: number,
    quantity: number,
    size: number,
    brand: string,
    code: string

}

export const bikeColumns:string[] = ['code', 'name/model', 'description', 'price/hr', 'quantity', 'profile'];
