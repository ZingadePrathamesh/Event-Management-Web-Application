import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { executeCreateNewUser } from "./api/ApiService";

export default function SignUpComponent() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [errorBoolean, setErrorBoolean] = useState(false);

    async function handleSubmit(values){
        const user={
            "name": values.name,
            "userName": values.userName,
            "email": values.email,
            "password": values.password
        };
        try {
        await executeCreateNewUser(user)
        .then(
            response =>{
                navigate("/login")
            }
        )
        .catch(
            error => 
            {
            setErrorBoolean(true)
            setError(error.response.data);
            }
        )
        } catch (error) {
            setErrorBoolean(true)
            setError(error.response.data);
        }  
    }

    return (
        <div className="form-div p-4" style={{textAlign:"left"}}>
        <div className="form-div-controller">
            { errorBoolean && <p className="error error-warning">{error}</p>}
            <Formik initialValues={{name, userName, email, password}}
            enableReinitialize = {true}
            onSubmit={handleSubmit}>
                {
                    (props) =>(
                        <Form className="form">
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <label className="form-label">Name</label>
                                <Field className="form-control p-1" type ="text" name ="name"/>
                            </fieldset>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <label className="form-label">Username</label>
                                <Field className="form-control p-1" type ="text" name="userName"/>
                            </fieldset>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <label className="form-label">email</label>
                                <Field className="form-control p-1" type ="text" name="email"/>
                            </fieldset>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <label className="form-label">password</label>
                                <Field className="form-control p-1" type ="password" name = "password"/>
                            </fieldset>
                            <Button type="submit" className="btn btn-dark mt-3">Save</Button>
                            
                        </Form>
                    )
                }

            </Formik>
        </div>
        </div>
    );
}