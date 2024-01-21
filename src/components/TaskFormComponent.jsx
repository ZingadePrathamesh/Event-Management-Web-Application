import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, FormLabel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { createTasksApi, getTaskForIdApi, updateTasksApi } from "./api/TasksApiService";
import { GetAuthContext } from "./security/AuthContext";
import { getUserNameApi } from "./api/UserService";

export default function TaskFormComponent(){
    const authContext = GetAuthContext();
    const username = authContext.username;
    const navigate = useNavigate();
    const {eventId} = useParams();
    const {taskId} = useParams();
    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [deadline, setDeadline] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [optionUserNames, setOptionUserNames] = useState([]);

    useEffect(
        retrieveTask, []
    )

    function retrieveTask(){
        retrieveUserNames()
        if(taskId != -1){
            getTaskForIdApi(username, eventId, taskId)
            .then(
                response=>{
                    setTaskName(response.data.taskName)
                    setAssignedTo(response.data.assignedTo)
                    setDeadline(response.data.deadline)
                    setTaskStatus(response.data.taskStatus)
                }
            )
            .catch(
                error=>console.error(error)
            )
        }
    }

    function retrieveUserNames(){
        getUserNameApi()
        .then(
            response => setOptionUserNames(response.data)
        )
        .catch(
            error => console.error(error)
        )
    }


    function handleTaskSubmission(values){
        const task ={
            taskId,
            taskName: values.taskName,
            deadline: values.deadline,
            assignedTo: values.assignedTo,
            taskStatus: values.taskStatus
        }
        if(taskId == -1){
            createTasksApi(username, eventId, task)
            .then(
                navigate('/tasks')
            )
            .catch(
                error=> console.error(error)
            )
        }
        else{
            updateTasksApi(username, eventId, taskId, task)
            .then(
                navigate('/tasks')
            )
            .catch(
                error=>console.error(error)
            )
        }
    }

    const optionTaskStatus = ["Completed", "Pending", "dropped"];

    return(
        <div className="form-div p-4" style={{textAlign:"left"}}>
             <h1>Task Form</h1>
            <div className="form-div-controller">
               
            
            <Formik 
            initialValues={{taskName, taskStatus, deadline, assignedTo}}
            enableReinitialize={true}
            onSubmit={handleTaskSubmission}>
                {
                    (props)=>(
                        <Form className="form">
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <FormLabel className="form-label">Name</FormLabel>
                                <Field className="form-control p-1" name = "taskName" type= "text"/>
                            </fieldset>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <FormLabel className="form-label">Assigned To</FormLabel>
                                <Field className="form-control form-select p-1" as="select"  name="assignedTo">
                                    <option value="" key="" >Select an option</option>
                                    {
                                        optionUserNames.map(
                                            (option)=>(
                                                <option key={option} value={option}>{option}</option>
                                            )              
                                        )
                                    }
                                </Field>
                            </fieldset>
                            <fieldset className="form-group m-2" style={{ textAlign: 'left' }}>
                                <FormLabel className="form-label">Deadline</FormLabel>
                                <Field className="form-control p-1" name = "deadline" type= "date"/>
                            </fieldset>
                            <fieldset>
                                <FormLabel className="form-label">Status</FormLabel>
                                <Field className="form-control form-select p-1" as="select"  name="taskStatus">
                                    <option value="" key="" >Select an option</option>
                                    {
                                        optionTaskStatus.map(
                                            (option)=>(
                                                <option key={option} value={option}>{option}</option>
                                            )              
                                        )
                                    }
                                </Field>
                            </fieldset>
                            <Button type="submit" className="btn btn-light mt-3">Save</Button>
                        </Form>
                    )
                }
            </Formik>
            </div>
        </div>
    );
}