import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const GetAuthContext = ()=> useContext(AuthContext);


export default function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    function login(username, password){
        if(username === "React" && password === "abcd"){
            setIsAuthenticated(true);
            return true;
        }
        else{
            setIsAuthenticated(false);
            return false;
        }
    }    
    function logout(){
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value = {{login, isAuthenticated}}> 
            {children}
        </AuthContext.Provider>
    );   
}

