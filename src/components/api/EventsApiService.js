import { apiClient } from "./ApiService";


export async function getEventsForUsername(username){
    console.log("hello");
    return apiClient.get(`/users/${username}/events`);
}
export function createEventApi(username, newEvent){
    return apiClient.post(`/users/${username}/events`, newEvent);
}
export function retrieveEventForId(username, eventId){
    return apiClient.get(`/users/${username}/events/${eventId}`)
}
export function deleteEventsForId(username , id){
    return apiClient.delete(`/users/${username}/events/${id}`)
}
export function updateEventsForIdApi(username , id, newEvent){
    return apiClient.put(`/users/${username}/events/${id}`, newEvent)
}