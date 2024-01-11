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
        []
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
            ()=>{
                alert("Deleted Successfully")
                retrieveTasks()
            }
        )
        .catch(
            error=>console.error(error)
        )
    }

    return(
        // <div>
        //     <table className="table table-light table-striped table-hover">
        //         <thead>
        //             <tr>
        //                 <th>Id</th>
        //                 <th>Name</th>
        //                 <th>Assigned</th>
        //                 <th>Deadline</th>
        //                 <th>Status</th>
        //                 <th></th>
        //                 <th></th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {
        //                 tasks.map( task=>(
        //                     <tr key={task.taskId}>
        //                         <td>{task.taskId}</td>
        //                         <td>{task.taskName}</td>
        //                         <td>{task.assignedTo}</td>
        //                         <td>{task.deadline}</td>
        //                         <td>{task.taskStatus}</td>
        //                         <td><Button className="btn btn-dark" onClick={()=>createNewTask(eventId, task.taskId)}>Update</Button></td>
        //                         <td><Button className="btn btn-danger" onClick={()=>deleteTask(eventId, task.taskId)}>Delete</Button></td>
        //                     </tr>
        //                 )
        //                 )
        //             }
        //         </tbody>
        //     </table>
        //     <div>
        //         <Button className="btn btn-light" onClick={()=>createNewTask(eventId, -1)}>Add</Button>
        //     </div>
        // </div>
        <div>
            <div>
                    <Button className="btn btn-light w-80 m-3" onClick={()=>createNewTask(eventId, -1)}>Add</Button>
            </div>
            <div className="task-div p-2">
                {
                    tasks.map(task=>(
                        <div class="card-div">
                            <div class="top-card">
                                <p class="task-text mr-40">{task.taskName}</p>
                                <p class="task-subtext ml-48 text-white" >{task.taskStatus}</p>
                            </div>
                                <div class="mid-card">
                                    <p class="task-date">{task.deadline}</p>
                                    <div>
                                        <button className="btn btn-dark" onClick={()=>createNewTask(eventId, task.taskId)}>Update</button>
                                        <button class="btn btn-danger m-2" onClick={()=>deleteTask(eventId, task.taskId)}>Delete</button>
                                    </div>
                                </div>
                            <div class="bottom-card">
                                <p class="task-bottomtext" >{task.assignedTo}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
    );
}