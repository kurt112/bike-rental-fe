import {SyntheticEvent} from "react";
import {axiosSubmit, graphQl} from "../../../.config/api";
import {CustomerCreate} from "../../../types/customer";
import moment from "moment";

export const handleSubmitCustomer = async (e:SyntheticEvent, customer:CustomerCreate) => {
    await axiosSubmit.post('customer',customer).then(ignored => {
        alert("Customer Create Success");
        location.reload();
    }).catch(error => {
        console.log(error)
    });
}

export const handlePatchCustomer = async (e:SyntheticEvent, customer:CustomerCreate) => {

    if(customer.user !== undefined){
        customer.user.birthdate = customer.user.birthdate?moment(customer.user.birthdate): moment();
    }

    await axiosSubmit.patch('customer',customer).then(ignored => {
        alert("Customer Update Success");
        location.reload();
    }).catch(error => {
        console.log(error)
    });
}

export const handleDeleteCustomer = async (id: any) => {

    const result = confirm("Are you sure you want to delete this customer?");

    if(!result) return;

    const params = new URLSearchParams();
    params.append('id',id);

    await axiosSubmit.delete('customer',{
        params
    }).then(ignored => {
        alert("Customer Delete Success");
        history.back();
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
