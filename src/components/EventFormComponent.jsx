import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createEventApi, retrieveEventForId, updateEventsForIdApi } from "./api/EventsApiService";
import { GetAuthContext } from "./security/AuthContext";
import { Button} from "react-bootstrap";
import moment from "moment";

export default function EventFormComponent(){
    const {eventId} = useParams();
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
        if(eventId!=-1){
            retrieveEventForId(username, eventId)
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
            eventId,
            username,
            name: values.name,
            status: values.status,
            targetDate: values.targetDate
        }
        if(eventId!=-1){
            updateEventsForIdApi(username, eventId, newEvent)
            .then(
                navigate('/events')
            )
            .catch(
                error =>{ console.error(error)
                alert(error)}
            )
        }
        else{
            createEventApi(username, newEvent)
            .then(
                navigate("/events")
            )
            .catch(
                error=> {console.error(error)
                    alert(error)}
            )
        }
    }

    function validationFunction(values){
        const errors = {}
        const validDatess = new Date(
            new Date().getFullYear() - 1000,
            new Date().getMonth(),
            new Date().getDate()
          );          
        if(values.name.length < 2){
            console.log("Atleast 2 characters!")
            errors.name = "Atleast 2 Characters!"
        }
        if(values.status == null || values.status == ""){
            errors.status = "Enter the status of the event"
        }
        if(values.targetDate ==null || !values.targetDate){
            errors.targetDate = "Enter a valid date"
        }
        return errors;
    }

    const statusOptions = ["Upcoming", "Ongoing", "Completed"];

    return(
        <div className="p-4">
            <h1>Event Form</h1>
            <Formik initialValues={{name, status, targetDate}}
            enableReinitialize={true}
            onSubmit={(values) => handleSubmit(values)}
            validate={validationFunction}
            validateOnBlur={false}
            validateOnChange={false}>
                {
                    (props)=>(
                        <Form className="form">
                            <ErrorMessage
                                name="name"
                                className="alert alert-warning"
                                component="h6"
                            />
                            <ErrorMessage
                                name="targetDate"
                                className="alert alert-warning"
                                component="h6"
                            />
                            <ErrorMessage
                                name="status"
                                className="alert alert-warning"
                                component="h6"
                            />
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