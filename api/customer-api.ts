import {SyntheticEvent} from "react";
import {axiosGet, axiosSubmit, graphQl} from "../.config/api";
import {CustomerCreate} from "../types/customer";
import moment from "moment";
import {path} from "../utils/api/endpoint";
import Swal from "sweetalert2";
import {handleUploadPhoto} from "./bike-api";

export const handleSubmitCustomer = async (customer:CustomerCreate) => {


    await axiosSubmit.post(path.customer,customer).then(ignored => {
        Swal.fire(
            'Good Job!',
            'Create Customer Success!',
            'success'
        ).then(() => {})
    }).catch(error => {
        console.log(error)
    });
}

export const handlePatchCustomer = async (customer:CustomerCreate) => {

    if(customer.user !== undefined){
        customer.user.birthdate = customer.user.birthdate?moment(customer.user.birthdate): moment();
    }

    await axiosSubmit.patch(path.customer,customer).then(ignored => {
        Swal.fire(
            'Good Job!',
            'Update Customer Success!',
            'success'
        ).then(() => {})
    }).catch(error => {
        console.log(error)
    });
}

export const handleDeleteCustomer = async (id: any) => {

    const result = confirm("Are you sure you want to delete this customer?");

    if(!result) return;

    const params = new URLSearchParams();
    params.append('id',id);

    await axiosSubmit.delete(path.customer,{
        params
    }).then(ignored => {
        alert("Customer Delete Success");
        history.back();
    }).catch(error => {
        console.log(error)
    });
}

    export const handleApproveRequestByCustomer = async (userId:string, bikeId: string) => {

    const params = new URLSearchParams();

    params.append('userId',userId);
    params.append('bikeId',bikeId);

    console.log(params);

    await axiosSubmit.post(`${path.bike}/request/approved`,params).then(ignored => {
        Swal.fire(
            'Approved!',
            'The request for bike is approved',
            'success'
        ).then(() => {
            location.reload();
        })
    }).catch(error => {
        console.log(error)
    });
}
export const getCustomerData = async (id:any) => {
    const query = () => {
        return {
            query: `query{
                        customerById(id:${id}) {  
                                id,
                                user{
                                   id,
                                   email,
                                   firstName,
                                   middleName,
                                   lastName,
                                   gender,
                                   password,
                                   birthdate,
                                   userRole,
                                   cellphone,
                                   isAccountNotExpired,
                                   isAccountNotLocked,
                                   isCredentialNotExpired
                                }
                             }
                        }`
        }
    };
    const {data} = await graphQl.post('', query());
    return data.data.customerById;
}
export const getCustomers = async (search:any, page:any, size:any, status:any) => {
    const query = () => {
        return {
            query: `query{
                        customers(search:"${search}",page:${page}, size: ${size}, status:${status}) {  
                                user{
                                   id,
                                   email,
                                   firstName,
                                   middleName,
                                   lastName,
                                   gender,
                                   password,
                                   birthdate,
                                   userRole,
                                   cellphone,
                                   isAccountNotExpired,
                                   isAccountNotLocked,
                                   isCredentialNotExpired
                                },
                                 id,
                                 toPay,
                                 isMember,
                                 lastBilled,
                                 nextBilled,
                                 createdAt,
                                 updatedAt
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());

    return data.data.customers;
}

export const customerSettings = async () => {
    return await axiosGet.get('customer/settings').then(result => result.data.data)
}
