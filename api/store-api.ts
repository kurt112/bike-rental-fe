import {axiosSubmit, graphQl} from "../.config/api";
import {SyntheticEvent} from "react";
import {Store} from "../types/store";
import Swal from "sweetalert2";

export const handleSubmit = async (e:SyntheticEvent, store:Store) => {
    await axiosSubmit.post('store',store).then(ignored => {
        Swal.fire(
            'Store Data Save!',
            'New Data for Store is successfully save!',
            'success'
        ).then(() => {
            location.reload();
        })
    }).catch(error => {
        console.log(error)
    });
}

export const getStoreData = async (id:any) => {
    const query = () => {
        return {
            query: `query{
                        storeById(id:"${id}") {
                                id,  
                                longitude,
                                name,
                                latitude,
                                radius,
                                scopeColor,
                                scopeEdgeColor,
                                paymaya,
                                gcash,
                                bdo,
                                bpi,
                                securityBank
                             }
                        }`
        }
    };
    const {data} = await graphQl.post('', query());

    return data.data.storeById;
}
