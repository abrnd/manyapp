import * as React from 'react';
import moment from 'moment';
import Status from './Status';


const Task = ({user, task, status, onGetExtentionFile, onChangeStatus, onDeleteTask}) => {
    return(
        <tr>
            <td>{task.title}</td>
            <td>{task.content}</td>
            <td>{moment(task.createdAt).format("YYYY/MM/DD")}</td>
            <td>{ task.attachment
                ? <button onClick={onGetExtentionFile} data-taskid={task.id}>download</button>
                : <span>pas de pièce jointe</span>
            }</td>
            {( () => {
                if(user.roles.includes('ROLE_ADMIN')){
                    return(
                        <>
                            <td>
                                <Status 
                                    status={status}

                                    taskId={task.id}
                                    taskStatusId={task.Status.id}
                                    currentStatus={task.Status.name}
                                    onChangeStatus={onChangeStatus}
                                />
                            </td>
                            <td>{task.User.username}</td>
                            <td>
                                <button onClick={onDeleteTask} data-taskid={task.id} >x</button>
                            </td>
                        </>
                    );
                } else {
                    return(
                        <>
                            <td>{task.Status.name}</td>
                        </>
                    )
                }
            })()}
        </tr>

    );
}

export default Task;

/*

                                <select name="status" value={task.Status.id} data-taskid={task.id} onChange={onChangeStatus}>
                                    {status?.map( (stat) => {
                                        if(task.Status.name === "waiting"){
                                            return <option key={stat.id} value={stat.id}>{stat.name}</option>
                                        }
                                        else if(task.Status.name === "in progress") {
                                            if(stat.name === "in progress" || stat.name === "closed"){
                                                return <option key={stat.id} value={stat.id}>{stat.name}</option>                                                                    
                                            }
                                        } 
                                        else {
                                            if(stat.name === "closed") {
                                                return <option key={stat.id} value={stat.id}>{stat.name}</option>
                                            }
                                        }
                                    })}
                                </select>

                                */