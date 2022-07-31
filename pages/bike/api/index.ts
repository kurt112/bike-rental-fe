import {SyntheticEvent} from "react";
import {axiosSubmit, graphQl} from "../../../.config/api";
import {BikeObject} from "../../../types/bike";

export const handleSubmit = async (e:SyntheticEvent, bike:BikeObject) => {
    // e.preventDefault();

    await axiosSubmit.post('bike',bike).then(e => {
        console.log(e);
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
                                description
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
                                description
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());


    return data.data.bikes;
}
