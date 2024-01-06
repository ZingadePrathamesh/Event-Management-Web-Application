import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { GetAuthContext } from "./security/AuthContext";
import './EventComponent.css';
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function LoginComponent(){
    const username = "programmer"
    const password = "abcd"
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(false);
    const authContext = GetAuthContext();
 
    // function handleUsername(event){
    //     setUsername(event.target.value);
    // }

    // function handlePassword(event){
    //     setPassword(event.target.value);
    // }

    async function authenticate(values){
        try {
            if(await authContext.login(values.username, values.password)){
                navigate(`/welcome/${values.username}`);
            }
            else{
                setErrorMessage(true);
            }
        } catch (error) {
            setErrorMessage(true);
        }

    }
    async function validationLogin(values){
        const errors = {}
        if(await !authContext.login(values.username, values.password)){
            errors.username = "invalid credentials"
        }
        return errors;
    }
    return(
        // <div className="container">
        //     <div className="loginForm">
        //         <h3  class="text-base text-xl font-semibold leading-4 text-gray-900">Event Management</h3>
        //         <p class="mt-1 text-m leading-4 text-gray-600">Login to continue.</p>
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

        <div className="login-body">
            <div className="login-container">
                <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Welcome to Event Management!</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Login to continue</p>
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
                                className=""
                            />
                            {errorMessage && <div>Invalid credentials</div>}
                            <fieldset className="">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                <div class="mt-2">
                                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <Field type = "text" name="username" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 m:text-m m:leading-6"/>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="">
                                <label className="block mt-3 text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div class="mt-2">
                                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <Field type = "password" name="password" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 m:text-m m:leading-6"/>
                                    </div>
                                </div>
                            </fieldset>
                            <div class="mt-6 flex items-center justify-end gap-x-6">
                                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>
        </div>


        
    );
}