import {SyntheticEvent} from "react";
import {axiosGet, axiosSubmit, graphQl} from "../.config/api";
import {path} from "../utils/api/endpoint";
import moment from "moment/moment";
import {EmployeeCreate} from "../types/employee";
import Swal from "sweetalert2";
export const handleSubmitEmployee = async (employee:EmployeeCreate) => {
    return await axiosSubmit.post(path.employee,employee).then(ignored => {
        return Swal.fire(
            'Good Job!',
            'Create Employee Success!',
            'success'
        ).then(() => {

        })
    }).catch(error => {
        throw error.response.data;
    });
}

export const handlePatchEmployee = async (e:SyntheticEvent, employee:EmployeeCreate) => {

    if(employee.user !== undefined){
        employee.user.birthdate = employee.user.birthdate?moment(employee.user.birthdate): moment();
    }

    return await axiosSubmit.patch(path.employee,employee).then(ignored => {
        Swal.fire(
            'Good Job!',
            'Update Employee Success!',
            'success'
        ).then(() => {

        });
    }).catch(error => {
        throw error.response.data;
    });
}

export const handleDeleteEmployee = async (id: any) => {

    Swal.fire({
        title: 'Are you sure you want to delete this employee?',
        text: "this action is irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const params = new URLSearchParams();
            params.append('id', id);
            axiosSubmit.delete(path.employee,{
                params
            }).then(ignored => {
                Swal.fire({
                    title: 'Delete Success',
                    timer: 2000,
                    icon: 'success'
                }).then((ignored) => {
                    history.back();
                })
            }).catch(error => {
                console.log(error)
            });
        }
    })
}

export const getEmployeeData = async (id:any) => {
    const query = () => {
        return {
            query: `query{
                        employeeById(id:${id}) {  
                                id,
                                isActive,
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
                                   isCredentialNotExpired,
                                   isEnabled
                                }
                             }
                        }`
        }
    };
    const {data} = await graphQl.post('', query());
    return data.data.employeeById;
}

export const getEmployees = async (search:any, page:any, size:any, status:any) => {
    const query = () => {
        return {
            query: `query{
                        employees(search:"${search}",page:${page}, size: ${size}, status:${status}) {  
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
                                 id
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());

    return data.data.employees;
}

export const customerSettings = async  () => {
    return await axiosGet('employee/settings').then(result => result.data.data);
}
