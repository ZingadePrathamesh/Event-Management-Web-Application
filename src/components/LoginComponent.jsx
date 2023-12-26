import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { GetAuthContext } from "./security/AuthContext";
import './EventComponent.css';

export default function LoginComponent(){
    const [username, setUsername] = useState("React");
    const [password, setPassword] = useState("abcd");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(false);
    const authContext = GetAuthContext();

    function handleUsername(event){
        setUsername(event.target.value);
    }

    function handlePassword(event){
        setPassword(event.target.value);
    }

    function authenticate(){
        if(authContext.login(username, password)){
            navigate(`/welcome/${username}`);
        }
        else{
            setErrorMessage(true);
        }
    }

    return(
        <div className="container">
            <div className="loginForm">
                <h3>Event Management</h3>
                {errorMessage && <div>Invalid credentials</div>}
                <div className="element">
                    <label className="label">User Name:</label>
                    <input type="text" value = {username} onChange={handleUsername}/>
                </div>
                
                <div className="element">
                    <label>Password</label>
                    <input type="password" value={password} onChange={handlePassword}/>
                </div>

                <div className="m-3">
                    <Button variant="secondary" onClick={authenticate}>Login</Button>
                </div>
            </div>
        </div>
    );
}