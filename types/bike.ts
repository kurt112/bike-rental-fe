export interface BikeObject{
    name: string,
    description: string,
    price: number,
    quantity: number,
    size: number,
    brand: string,
    code: string,
    bikePictures: bikePictures[],
    status: number;
    id?: string,
    startBarrow?: any | Date,
    endBarrow?: any | Date
    parentBike?:BikeObject
}

interface bikePictures{
    id: number,
    pictureName: string | null
}

export const bikeColumns:string[] = ['code', 'name/model', 'description', 'price/hr', 'quantity', 'profile'];
