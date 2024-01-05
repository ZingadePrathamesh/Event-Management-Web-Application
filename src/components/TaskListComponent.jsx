import { useEffect, useState } from "react";
import { GetAuthContext } from "./security/AuthContext";
import { deleteTaskForIdApi, retrieveTasksForIdApi } from "./api/TasksApiService";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function TaskListComponent({eventId}){
    const authContext = GetAuthContext();
    const navigate = useNavigate();
    const username = authContext.username;
    const [tasks, setTasks] = useState([]);

    useEffect(
        retrieveTasks, 
        [deleteTask]
    )

    function retrieveTasks(){
        retrieveTasksForIdApi(username, eventId)
        .then(
            response => {
                console.log(response);
                setTasks(response.data);
            }
        )
        .catch(
            error=>console.error(error.response.data.message)
        )
    }

    function createNewTask(eventId, taskId){
        navigate(`/events/${eventId}/tasks/${taskId}`)
    }

    function deleteTask(eventId, taskId){
        deleteTaskForIdApi(username, eventId, taskId)
        .then(
            alert("Deleted Successfully")
        )
        .catch(
            error=>console.error(error)
        )
    }

    return(
        <div>
            <table className="table table-light table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Assigned</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map( task=>(
                            <tr key={task.taskId}>
                                <td>{task.taskId}</td>
                                <td>{task.taskName}</td>
                                <td>{task.assignedTo}</td>
                                <td>{task.deadline}</td>
                                <td>{task.taskStatus}</td>
                                <td><Button className="btn btn-dark" onClick={()=>createNewTask(eventId, task.taskId)}>Update</Button></td>
                                <td><Button className="btn btn-danger" onClick={()=>deleteTask(eventId, task.taskId)}>Delete</Button></td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
            <div>
                <Button className="btn btn-light" onClick={()=>createNewTask(eventId, -1)}>Add</Button>
            </div>
        </div>
    );
}