import {SyntheticEvent} from "react";
import {axiosGet, axiosSubmit, graphQl} from "../.config/api";
import {path} from "../utils/api/endpoint";
import moment from "moment/moment";
import {EmployeeCreate} from "../types/employee";

export const handleSubmitEmployee = async (e:SyntheticEvent, employee:EmployeeCreate) => {
    await axiosSubmit.post(path.employee,employee).then(ignored => {
        alert("Employee Create Success");
        location.reload();
    }).catch(error => {
        console.log(error)
    });
}

export const handlePatchEmployee = async (e:SyntheticEvent, employee:EmployeeCreate) => {

    if(employee.user !== undefined){
        employee.user.birthdate = employee.user.birthdate?moment(employee.user.birthdate): moment();
    }

    await axiosSubmit.patch(path.employee,employee).then(ignored => {
        alert("Employee Update Success");
        location.reload();
    }).catch(error => {
        console.log(error)
    });
}

export const handleDeleteEmployee = async (id: any) => {

    const result = confirm("Are you sure you want to delete this employee?");

    if(!result) return;

    const params = new URLSearchParams();
    params.append('id',id);

    await axiosSubmit.delete(path.employee,{
        params
    }).then(ignored => {
        alert("Employee Delete Success");
        history.back();
    }).catch(error => {
        console.log(error)
    });
}

export const getEmployeeData = async (id:any) => {
    const query = () => {
        return {
            query: `query{
                        employeeById(id:${id}) {  
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
