import {axiosSubmit, graphQl} from "../../../.config/api";
import {SyntheticEvent} from "react";
import {Store} from "../../../types/store";

export const handleSubmit = async (e:SyntheticEvent, store:Store) => {
    await axiosSubmit.post('store',store).then(ignored => {
        alert('Store Data Save');
        location.reload();
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
                                latitude
                             }
                        }`
        }
    };
    const {data} = await graphQl.post('', query());

    return data.data.storeById;
}
