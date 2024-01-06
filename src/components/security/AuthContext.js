import { createContext, useContext, useState } from "react";
import { apiClient, executeBasicAuthentication } from "../api/ApiService";
import { configure } from "@testing-library/react";

export const AuthContext = createContext();
export const GetAuthContext = ()=> useContext(AuthContext);


export default function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    async function login(username, password){
        const baToken = 'Basic ' + window.btoa(username + ":" + password)

        try {
            const response = await executeBasicAuthentication(baToken)
            if(response.status==200){
                setToken(baToken)
                setIsAuthenticated(true);
                setUsername(username)

                apiClient.interceptors.request.use(
                    (config) =>{
                        config.headers.Authorization = baToken
                        return config;
                    }
                )
                return true;
            }
            else{
                logout()
                return false;
            }
        } catch (error) {
            logout()
            return false;
        }
    }   

    function logout(){
        setToken(null)
        setUsername(null)
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value = {{login, isAuthenticated, username, logout, token}}> 
            {children}
        </AuthContext.Provider>
    );   
}

