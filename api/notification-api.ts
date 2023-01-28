import {graphQl} from "../.config/api";

export const getNotifications = async (page: any, size: any) => {
    const token = localStorage.getItem('token')
    const query = () => {
        return {
            query: `query{
                        getNotifications(page:${page}, size: ${size}, token:"${token}") {  
                                id,
                                message,
                                createdAt,
                                link,
                                from{
                                    id,
                                    firstName,
                                    lastName
                                }
                             }
                        }`
        }
    };

    const {data} = await graphQl.post('', query());

    return data.data.getNotifications;
}
