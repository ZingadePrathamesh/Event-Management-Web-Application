import { apiClient } from "./ApiService";

export function getUserNameApi(){
    return apiClient.get("/users");
}