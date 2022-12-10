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
}

interface bikePictures{
    id: number,
    image: string | null
}

export const bikeColumns:string[] = ['code', 'name/model', 'description', 'price/hr', 'quantity', 'profile'];
