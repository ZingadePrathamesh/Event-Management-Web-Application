import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, FormLabel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { createTasksApi, getTaskForIdApi, updateTasksApi } from "./api/TasksApiService";
import { GetAuthContext } from "./security/AuthContext";

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

    useEffect(
        retrieveTask, []
    )

    function retrieveTask(){
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
        <div style={{textAlign:"left"}}>
            <div className="p-3"><h1>Task Form</h1></div>
            <Formik 
            initialValues={{taskName, taskStatus, deadline, assignedTo}}
            enableReinitialize={true}
            onSubmit={handleTaskSubmission}>
                {
                    (props)=>(
                        <Form className="form p-3">
                            <fieldset className="form-group">
                                <FormLabel>Name</FormLabel>
                                <Field name = "taskName" type= "text"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <FormLabel>Assigned To</FormLabel>
                                <Field name = "assignedTo" type= "text"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <FormLabel>Deadline</FormLabel>
                                <Field name = "deadline" type= "date"/>
                            </fieldset>
                            <fieldset>
                                <FormLabel>Status</FormLabel>
                                <Field as="select"  name="taskStatus" className="form-select">
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
    );
}