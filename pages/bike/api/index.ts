import {SyntheticEvent} from "react";
import {axiosSubmit, graphQl} from "../../../.config/api";
import {BikeObject} from "../../../types/bike";
import Swal from 'sweetalert2'
export const handleSubmit = async (e:SyntheticEvent, bike:BikeObject) => {
    // e.preventDefault();
    await axiosSubmit.post('bike',bike).then(ignored => {
        Swal.fire(
            'Good Job!',
            'Create Bike Success!',
            'success'
        ).then(() => {
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
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());


    return data.data.bikes;
}

// for photo
export const handleUploadPhoto = async (e:SyntheticEvent, formData:any) => {
    // e.preventDefault();
    console.log("wew")
    console.log(formData);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    await axiosSubmit.post('bike/photo',formData,config).then(e => {
        alert('Create Bike Success');
        // location.reload();
    }).catch(error => {
        console.log(error)
    });
}

