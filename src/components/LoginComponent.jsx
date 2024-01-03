import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { GetAuthContext } from "./security/AuthContext";
import './EventComponent.css';
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function LoginComponent(){
    const [username, setUsername] = useState("programmer");
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

    // function authenticate(){
    //     if(authContext.login(username, password)){
    //         navigate(`/welcome/${username}`);
    //     }
    //     else{
    //         setErrorMessage(true);
    //     }
    // }    

    function authenticate(values){
        if(authContext.login(values.username, values.password)){
            navigate(`/welcome/${values.username}`);
        }
        else{
            setErrorMessage(true);
        }
    }
    function validationLogin(values){
        const errors = {}
        if(!authContext.login(values.username, values.password)){
            errors.username = "invalid credentials"
        }
        return errors;
    }
    return(
        // <div className="container">
        //     <div className="loginForm">
        //         <h3>Event Management</h3>
        //         {errorMessage && <div>Invalid credentials</div>}
        //         <div className="element">
        //             <label className="label">User Name:</label>
        //             <input type="text" value = {username} onChange={handleUsername}/>
        //         </div>
                
        //         <div className="element">
        //             <label>Password</label>
        //             <input type="password" value={password} onChange={handlePassword}/>
        //         </div>

        //         <div className="m-3">
        //             <Button variant="secondary" onClick={authenticate}>Login</Button>
        //         </div>
        //     </div>
        // </div>
        <div className="loginForm">
            <h2>Welcome Back!</h2>
            <h4 style={{"color":"gray"}}>Login to Continue</h4>
            <Formik
             initialValues={{username, password}}
             onSubmit={authenticate}
             validate={validationLogin}
             validateOnBlur = {false}
             validateOnChange = {false}>
                <Form className="">
                    <ErrorMessage
                        component="div"
                        name="username"
                        className="alert alert-warning"
                    />
                    <fieldset className="form-group ">
                        <label className="form-label">Username</label>
                        <Field type = "text" name="username" className="form-control"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label className="form-label">Password</label>
                        <Field type = "password" name="password" className="form-control"/>
                    </fieldset>
                    <Button type="submit" className="btn btn-dark mt-3"  >Login</Button>
                </Form>
            </Formik>
        </div>
    );
}