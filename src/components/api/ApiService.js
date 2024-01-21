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

export function executeCreateNewUser(user){
    return apiClient.post(`/api/signup`, user);
}