import {SyntheticEvent} from "react";
import {axiosCreate, axiosGet, axiosSubmit, graphQl} from "../.config/api";
import {BikeObject} from "../types/bike";
import Swal from 'sweetalert2'
import {getBikeStatus} from "../utils/bike";

export const requested:Array<BikeObject> = [];
export const rented:Array<BikeObject> = [];
export const handleSubmit = async (e:SyntheticEvent, bike:BikeObject, image: FormData | null | undefined) => {

    if(!image){
        return Swal.fire(
            'Photo Not Found',
            'Please upload at least three photo!',
            'error'
        ).then((ignored) => {})
    }


    // e.preventDefault();
    await axiosSubmit.post('bike',bike).then(result => {
        const newBike = result.data.data;
        Swal.fire(
            'Good Job!',
            'Create Bike Success!',
            'success'
        ).then(() => {
            handleUploadPhoto(image,newBike.id);
            location.reload();
        })

    }).catch(error => {
        console.log(error)
    });
}

export const getBikeData = async (id:any) => {
    const query = () => {
        return {
            query: `query{
                        bikeById(id:"${id}") {  
                                size,
                                brand,
                                price,
                                name,
                                quantity,
                                id,
                                description,
                                bikePictures{
                                    id,
                                    image
                                }
                             }
                        }`
        }
    };
    const {data} = await graphQl.post('', query());

    return data.data.bikeById;
}

export const handleDeleteBike = async (id: any) => {

    const result = confirm("Are you sure you want to delete this bike?");

    if(!result) return;

    const params = new URLSearchParams();
    params.append('id',id);

    await axiosSubmit.delete('bike',{
        params
    }).then(ignored => {
        alert("Bike Delete Success");
        history.back();
    }).catch(error => {
        console.log(error)
    });
}

export const getBikes = async (search:any, page:any, size:any, status:any) => {
    const query = () => {
        return {
            query: `query{
                        bikes(search:"${search}",page:${page}, size: ${size}, status:${status}) {  
                                brand,
                                price,
                                name,
                                quantity,
                                id,
                                description,
                                code
                                assignedCustomer{
                                    user{
                                       id, 
                                       firstName,
                                       lastName,
                                       cellphone,
                                       email
                                    }
                                }
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());


    return data.data.bikes;
}

export const getBikeAvailable = async (search:any, page:any, size:any) => {
    const query = () => {
        return {
            query: `query{
                        bikes(search:"${search}",page:${page}, size: ${size}, status:${getBikeStatus.NOT_RENTED}) {  
                                brand,
                                price,
                                name,
                                quantity,
                                id,
                                description,
                                code
                                bikePictures{
                                    id,
                                    image
                                }
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());


    return data.data.bikes;
}

export const getBikeByCustomer = async (search:any) => {
    const token = localStorage.getItem('token')
    const query = () => {
        return {
            query: `query{
                        getBikeByCustomer(search:"${search}", token:"${token}") {  
                                brand,
                                price,
                                name,
                                quantity,
                                id,
                                description,
                                code,
                                status
                                bikePictures{
                                    id,
                                    image
                                }
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());

    data.data.getBikeByCustomer.forEach((bike: BikeObject) => {
        console.log(bike);
        if(bike.status  === getBikeStatus.FOR_REQUEST){
            requested.push(bike);
        }else if(bike.status === getBikeStatus.RENTED) {
            rented.push(bike);
        }

    })


    return data.data.getBikeByCustomer;
}

// for photo4
export const handleUploadPhoto = async (formData:FormData, bikeId: string) => {
    const params = new URLSearchParams();
    params.append('bike-id',bikeId);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        },
        params
    }

    await axiosSubmit.post('bike/photo',formData,config).then(ignored => {

    }).catch(error => {
        console.log(error)
    });
}

export const bikeSettings = async () => {
    return await axiosGet.get('bike/settings').then(result => result.data.data);
}

export const loadImages = async (bikes: any, setPictures:any) => {
    const currentPictures: any = [];
    await Promise.all(
        bikes.map(async (bike: any) => {

            if (bike.bikePictures.length <= 0) {
                currentPictures.push('');
                return;
            }

            const params = new URLSearchParams();
            params.append("id", bike.bikePictures[0].id);

            const {picture} = await axiosCreate.get("bike/photo", {params}).then(result => {
                return result.data;
            });

            currentPictures.push(picture.blob);
        })
    )

    setPictures(currentPictures);

    return currentPictures;
}