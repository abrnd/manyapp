import * as React from 'react';
import Form from 'react-bootstrap/Form';

const Status = ({status, taskId, taskStatusId, currentStatus, onChangeStatus}) => {

    return(
        <Form.Select name="status" value={taskStatusId} data-taskid={taskId} onChange={onChangeStatus}>
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
        </Form.Select>
    );
}

export default Status;