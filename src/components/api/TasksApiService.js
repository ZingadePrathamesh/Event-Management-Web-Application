import { apiClient } from "./ApiService";


export function retrieveTasksForIdApi(username, eventId){
    return apiClient.get(`/users/${username}/events/${eventId}/tasks`);
}
export function createTasksApi(username, eventId, task){
    return apiClient.post(`/users/${username}/events/${eventId}/tasks`, task);
}
export function updateTasksApi(username, eventId, taskId, task){
    return apiClient.put(`/users/${username}/events/${eventId}/tasks/${taskId}`, task);
}
export function getTaskForIdApi(username, eventId, taskId){
    return apiClient.get(`/users/${username}/events/${eventId}/tasks/${taskId}`);
}


