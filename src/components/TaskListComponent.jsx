import { useEffect, useState } from "react";
import { GetAuthContext } from "./security/AuthContext";
import { retrieveTasksForIdApi } from "./api/TasksApiService";

export default function TaskListComponent({eventId}){
    const authContext = GetAuthContext();
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




    return(
        <div>
            <table className="table table-light table-striped table-hover">
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Assigned</th>
                    <th>Deadline</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    {
                        tasks.map( task=>(
                            <tr key={task.taskId}>
                                <td>{task.taskId}</td>
                                <td>{task.taskName}</td>
                                <td>{task.assignedTo}</td>
                                <td>{task.deadline}</td>
                                <td>{task.status}</td>
                            </tr>
                        )
                        )
                    }
                </tbody>

            </table>
        </div>
    );
}