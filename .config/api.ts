import axios from "axios";

export const host_url = process.env.NODE_ENV === 'development'? 'http://localhost:8080':'https://bikerentalbe-env.eba-bwmn6ivr.ap-southeast-1.elasticbeanstalk.com';
export const host_url_graphQl = `${host_url}/data`
export const graphQl = axios.create({
    baseURL: host_url_graphQl
})

export const axiosSubmit = axios.create({
    baseURL:`${host_url}/`
})

export const axiosCreate = axios.create({
    baseURL:`${host_url}/`
})

// this method will use get from axios
export const axiosGet = axios.create({
    baseURL:`${host_url}/`
})

