import * as React from 'react';

const Status = ({status, taskId, taskStatusId, currentStatus, onChangeStatus}) => {

    return(
        <select name="status" value={taskStatusId} data-taskid={taskId} onChange={onChangeStatus}>
            {status?.map( (stat) => {
                if(currentStatus === "waiting"){
                    return <option key={stat.id} value={stat.id}>{stat.name}</option>
                }
                else if(currentStatus === "in progress") {
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
    );
}

export default Status;