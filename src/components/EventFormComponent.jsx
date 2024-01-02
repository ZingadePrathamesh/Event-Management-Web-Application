import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { retrieveEventForId } from "./api/EventsApiService";
import { GetAuthContext } from "./security/AuthContext";
import { Button } from "react-bootstrap";

export default function EventFormComponent(){
    const {id} = useParams();
    const authContext = GetAuthContext();
    const username = authContext.username;
    const [name, setName] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [status, setStatus] = useState("");
    
    useEffect(
        retrieveEvent,
        []
    )

    function retrieveEvent(){
        if(id!=-1){
            retrieveEventForId(username, id)
            .then(
                response=>{
                    setName(response.data.name)
                    setStatus(response.data.status)
                    setTargetDate(response.data.targetDate)
                }
            )
            .catch(
                error => console.error(error)
            )
        }
    }

    function handleSubmit(){
        console.log(name + " " + status +" "+ targetDate);
    }

    return(
        <div className="p-4">
            Form
            <Formik initialValues={{name, status, targetDate}}
            enableReinitialize={true}>
                {
                    (props)=>(
                        <Form>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <label className="form-label">Name</label>
                                <Field className="form-control p-1" name="name" type="text"/>
                            </fieldset>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <label className="form-label">Status</label>
                                <Field className="form-control p-1" name="status" type="text"/>
                            </fieldset>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <label className="form-label">Target Date</label>
                                <Field className="form-control p-1" name="targetDate" type="date"/>
                            </fieldset>
                            <div>
                                <Button className="btn btn-light m-3" type="submit" onClick={handleSubmit}>Save</Button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
}