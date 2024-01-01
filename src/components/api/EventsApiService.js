import { apiClient } from "./ApiService";

export function getEventsForUsername(){
    return apiClient.get('/users/programmer/events');
}