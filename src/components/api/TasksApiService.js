import { apiClient } from "./ApiService";


export function retrieveTasksForIdApi(username, eventId){
    return apiClient.get(`/users/${username}/events/${eventId}/tasks`);
}