import * as React from 'react';
import Task from './Task';

import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


const ListTasks = ({user, tasks, status, onGetExtentionFile, onChangeStatus, onDeleteTask}) => {

    return(
        <Card style={{background: "lightgray"}}>
            <Card.Header style={{background: "white"}}>Liste des requêtes</Card.Header>
            <Card.Body>
                <Table striped bordered >
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>content</th>
                            <th>date</th>
                            <th>Pièce jointe</th>
                            <th>status</th>
                            {( ()=> {
                                if(user.roles.includes('ROLE_ADMIN')){
                                    return(
                                        <>
                                            <th>user</th>
                                            <th>del</th>
                                        </>
                                    );
                                }
                            })()}

                        </tr>
                    </thead>
                    <tbody>
                    { tasks?.map( (task) => (
                        <Task
                            key={task.id}
                            user={user}
                            task={task}
                            status={status}
                            onGetExtentionFile={onGetExtentionFile}
                            onChangeStatus={onChangeStatus}
                            onDeleteTask={onDeleteTask}
                        />
                    ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default ListTasks;