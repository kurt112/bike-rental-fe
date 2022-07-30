import {SyntheticEvent} from "react";
import {axiosSubmit, graphQl} from "../../../.config/api";
import {CustomerCreate} from "../../../types/customer";

export const handleSubmitCustomer = async (e:SyntheticEvent, customer:CustomerCreate) => {
    // e.preventDefault();

    await axiosSubmit.post('customer',customer).then(e => {
        console.log(e);
    }).catch(error => {
        console.log(error)
    });
}
export const getCustomerData = async (id:any) => {
    const query = () => {
        return {
            query: `query{
                        customerById(id:${id}) {  
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
    console.log('wew')
    const {data} = await graphQl.post('', query());
    console.log(data);
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

    console.log('i am here')

    const {data} = await graphQl.post('', query());

    console.log(data);
    return data.data.customers;
}
