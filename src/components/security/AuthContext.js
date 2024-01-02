import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const GetAuthContext = ()=> useContext(AuthContext);


export default function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("")
    
    function login(username, password){
        if(username === "programmer" && password === "abcd"){
            setIsAuthenticated(true);
            setUsername(username)
            return true;
        }
        else{
            // logout()
            return false;
        }
    }    
    function logout(){
        setUsername(null)
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value = {{login, isAuthenticated, username, logout}}> 
            {children}
        </AuthContext.Provider>
    );   
}

