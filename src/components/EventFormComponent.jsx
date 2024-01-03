import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createEventApi, retrieveEventForId, updateEventsForIdApi } from "./api/EventsApiService";
import { GetAuthContext } from "./security/AuthContext";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";

export default function EventFormComponent(){
    const {id} = useParams();
    const navigate = useNavigate();
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

    function handleSubmit(values){
        const newEvent = {
            id,
            username,
            name: values.name,
            status: values.status,
            targetDate: values.targetDate
        }
        if(id!=-1){
            updateEventsForIdApi(username, id, newEvent)
            .then(
                navigate('/events')
            )
            .catch(
                error => console.error(error)
            )
        }
        else{
            createEventApi(username, newEvent)
            .then(
                navigate("/events")
            )
            .catch(
                error=> console.error(error)
            )
        }
    }

    const statusOptions = ["Upcoming", "Ongoing", "Completed"];

    return(
        <div className="p-4">
            <h1>Event Form</h1>
            <Formik initialValues={{name, status, targetDate}}
            enableReinitialize={true}
            onSubmit={(values) => handleSubmit(values)}>
                {
                    (props)=>(
                        <Form>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <label className="form-label">Name</label>
                                <Field className="form-control p-1" name="name" type="text"/>
                            </fieldset>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <label className="form-label">Status</label>
                                <Field as="select" name="status" className="form-select">
                                    {statusOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                    ))}
                                </Field>
                            </fieldset>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <label className="form-label">Target Date</label>
                                <Field className="form-control p-1" name="targetDate" type="date"/>
                            </fieldset>
                            <div>
                                <Button className="btn btn-light m-3" type="submit">Save</Button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
}