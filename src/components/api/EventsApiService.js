import { apiClient } from "./ApiService";


export function getEventsForUsername(username){
    return apiClient.get(`/users/${username}/events`);
}
export function deleteEventsForId(username , id){
    return apiClient.delete(`/users/${username}/events/${id}`);
}