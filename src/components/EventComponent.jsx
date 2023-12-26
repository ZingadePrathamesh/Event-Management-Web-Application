import { Form, Button } from "react-bootstrap";
import './EventComponent.css';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EventComponent(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginComponent/>}/>
                <Route path='/login' element={<LoginComponent/>}/>
                <Route path='/welcome' element={<WelcomeComponent/>}/>
            </Routes>
        </BrowserRouter>
    );
}




export function LoginComponent(){
    const [username, setUsername] = useState("React");
    const [password, setPassword] = useState("abcd");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(false);

    function handleUsername(event){
        setUsername(event.target.value);
    }

    function handlePassword(event){
        setPassword(event.target.value);
    }

    function authenticate(){
        if(username === "React" && password === "abcd"){
            navigate('/welcome');
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

function WelcomeComponent(){
    return(
        <div>Welcome!</div>
    );
}