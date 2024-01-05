import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL:'http://localhost:8080'
    }
);

export function executeBasicAuthentication(token){
    return apiClient.get('/basicauth', {
        headers:{
            Authorization: token
        }
    })
}