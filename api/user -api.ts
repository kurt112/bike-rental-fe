import {axiosSubmit, graphQl} from "../.config/api";
import {path} from "../utils/api/endpoint";
import {BikeObject} from "../types/bike";
import {getBikeStatus} from "../utils/bike";
import {rented, requested} from "./bike-api";
import {UserCreate} from "../types/user";

export const handleUploadValidIdUser = async (userId: string, validId: string) => {

    const params = new URLSearchParams();

    params.append('userID',userId);
    params.append('validID',validId);

    return await axiosSubmit.post(path.user,params).then(result => {
        return result;
    }).catch(error => {
        throw error.response.data;
    });
}

export const getUserData = async () => {
    const token = localStorage.getItem('token')
    const query = () => {
        return {
            query: `query{
                        getUserById(token:"${token}") {
                                id,
                                email,
                                firstName,
                                middleName,
                                lastName,
                                gender,
                                birthdate,
                                cellphone,
                                isAccountNotExpired,
                                isAccountNotLocked,
                                isCredentialNotExpired,
                                isEnabled,
                                validIdPhoto,
                                password,
                                userRole   
                           }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());

    return data.data.getUserById;
}

export const handlePatchUser = async (user:UserCreate) => {
    return await axiosSubmit.patch(path.user,user).then(result => {
        return result;
    }).catch(error => {
        throw error.response.data;
    });
}