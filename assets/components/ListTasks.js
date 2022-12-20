import * as React from 'react';
import Task from './Task';

const ListTasks = ({user, tasks, status, onGetExtentionFile, onChangeStatus, onDeleteTask}) => {

    return(
        <div>
        <h2>Liste des requêtes</h2>
        <table>
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
        </table>
    </div>
    );
}

export default ListTasks;