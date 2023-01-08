import {axiosCreate, axiosGet, axiosSubmit, graphQl} from "../.config/api";
import {BikeObject} from "../types/bike";
import Swal from 'sweetalert2'
import {getBikeStatus} from "../utils/bike";
import {uploadToS3} from "./aws/s3";

export let requested: Array<BikeObject> = [];
export let rented: Array<BikeObject> = [];
export const handleSubmit = async (bike: BikeObject, images: any) => {

    if (!images) {
        return Swal.fire(
            'Photo Not Found',
            'Please upload at least one photo!',
            'error'
        ).then((ignored) => {
        })
    }

    // the one is the store id
    await axiosSubmit.post(`bike/${1}`, bike).then(result => {
        const newBike = result.data.data;
        Swal.fire(
            'Good Job!',
            'Create Bike Success!',
            'success'
        ).then(() => {
            const {data} = result.data;

            // getting the bike id
            images.forEach((image: any) => {
                uploadToS3(image, data).then(ignored => {
                })
                // location.reload();
            });
        })

    }).catch(error => {
        console.log(error)
    });
};

export const getBikeData = async (id: any) => {
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
                                code,
                                bikePictures{
                                    id,
                                    pictureName
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

    if (!result) return;

    const params = new URLSearchParams();
    params.append('id', id);

    await axiosSubmit.delete('bike', {
        params
    }).then(ignored => {
        alert("Bike Delete Success");
        history.back();
    }).catch(error => {
        console.log(error)
    });
}

export const getBikes = async (search: any, page: any, size: any, status: any) => {
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
                                code,
                                startBarrow,
                                endBarrow,
                                longitude,
                                latitude,
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

export const getBikeAvailable = async (search: any, page: any, size: any) => {
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
                                    pictureName
                                }
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());


    return data.data.bikes;
}

export const getBikeByCustomer = async (search: any) => {
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
                                status,
                                bikePictures{
                                    id,
                                    pictureName
                                },
                                parentBike{
                                    quantity,
                                     bikePictures{
                                        id,
                                        pictureName
                                     },
                                }
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());

    data.data.getBikeByCustomer.forEach((bike: BikeObject) => {
        if (bike.status === getBikeStatus.FOR_REQUEST) {
            requested.push(bike);
        } else if (bike.status === getBikeStatus.RENTED) {
            rented.push(bike);
        }

    })


    return data.data.getBikeByCustomer;
}

// for photo4
export const handleUploadPhoto = async (formData: FormData, bikeId: string) => {
    const params = new URLSearchParams();
    params.append('bike-id', bikeId);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        },
        params
    }

    await axiosSubmit.post('bike/photo', formData, config).then(ignored => {

    }).catch(error => {
        console.log(error)
    });
}

export const bikeSettings = async () => {
    return await axiosGet.get('bike/settings').then(result => result.data.data);
}

export const requestBikeByCustomer = async (bike: BikeObject) => {

    const token = localStorage.getItem('token');

    if (!bike.endBarrow) {
        alert('need date for end barrow')
        return;
    }

    if (!bike.startBarrow) {
        alert('need date for end barrow')
        return;
    }

    if (!token) {
        alert('No Token Found');
        return;
    }

    const startDate = new Date(bike.startBarrow);
    const endDate = new Date(bike.endBarrow);

    await axiosCreate.post("bike/request/" + token + "/" + bike.id + '/' + startDate + '/' + endDate, bike).then(ignored => {
        Swal.fire(
            'Good Job!',
            'Request Bike Success!',
            'success'
        ).then(() => {
            location.reload();
        })
    });
}


export const cancelRequestBikeByCustomer = async (bikeId: string) => {
    const token = localStorage.getItem('token')

    if (!token) {
        alert('No Token Found');
        return;
    }

    const params = new URLSearchParams();
    params.append("token", token);
    params.append("bikeId", bikeId);

    await axiosCreate.post("bike/cancel", params).then(ignored => {
        Swal.fire(
            'Good Job!',
            'Cancel Bike Success!',
            'success'
        ).then(() => {
        })
    });
}

export const handleApproveRequestByCustomer = async (userId: string, bikeId: string) => {

    const params = new URLSearchParams();
    params.append("userId", userId);
    params.append("bikeId", bikeId);

    await axiosCreate.post("bike/request/approval", params).then(ignored => {
        Swal.fire({
            title: 'Approve',
            timer: 2000,
            icon: 'success'
        }).then((ignored) => {

        })
    });
}
export const handleTerminateBikeByCustomer = async (userId: string, bikeId: string) => {

    const params = new URLSearchParams();
    params.append("userId", userId);
    params.append("bikeId", bikeId);

    await axiosCreate.post("bike/request/rejected", params).then(ignored => {
        Swal.fire({
            title: 'Terminate',
            timer: 2000,
            icon: 'success'
        }).then((ignored) => {

        })
    });
}
export const setRequestAndRentedToEmpty = () => {
    requested = [];
    rented = [];
}
