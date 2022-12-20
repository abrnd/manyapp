import * as React from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';
import { Ring } from 'react-awesome-spinners';
import { useNavigate } from 'react-router-dom';


import { useUser } from '../lib/authHooks';
import { API_ROUTES, APP_ROUTES } from '../utils/constants';
import AddTask from './Addtask';
import ListTasks from './ListTasks';

const Home = () => {

    const {user, authenticated } = useUser();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [tasks, setTasks] = React.useState([]);
    const [status, setStatus] = React.useState([]);
    const navigate = useNavigate();
    
    React.useEffect( () => {
        const fetchTask = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: API_ROUTES.GET_TASK                    
                });
                setTasks(response.data.tasks);
            }
            catch(err){
                console.log('Something went wrong during get_task', err);
            }
        }
        const fetchStatus = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: API_ROUTES.GET_STATUS
                });
                setStatus(response.data.status);
            }
            catch(err){
                console.log('Something went wrong during get_status', err);
            }
        }
        if(user){
            fetchTask();
            fetchStatus();
        }
    }, [user]);    
    
    if(!user || !authenticated){
        return(
            <Ring />
        )
    }
    
    const handleFileChange = (e) => {
        if(e.target.files){
            setFile(e.target.files[0]);
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const getExtensionFile = async (e) => {
        const taskId = e.target.getAttribute('data-taskid');
        const url = API_ROUTES.GET_EXTENSION + "/" + taskId;
        try{
            const response = await axios({
                method: 'get',
                url: url
            });

            handleDownload(taskId, response.data.extension);
        }
        catch(err){
            console.log('Something went wrong during get extension : ', err);
        }
    }

    const handleDownload = async (taskId, extension) => {
        const url = API_ROUTES.DOWNLOAD_FILE + "/" + taskId;
        try {
            const response = await axios({
                method: 'get',
                url: url,
                responseType: 'blob'
            });

            //fonctionne simplement avec les .jpg
            const fileName = "attachment." + extension;
            FileDownload(response.data, fileName);
        }
        catch(err){
            console.log('Error during download : ', err);
        }
    }

    const submitTask = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('title', title);
        bodyFormData.append('content', content);
        bodyFormData.append('file', file);
        try{
            const response = await axios({
                method: 'post',
                url: API_ROUTES.CREATE_TASK,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" }
            });
            setTasks(tasks => [...tasks, response.data.task]);
            setTitle("");
            setContent("");
            setFile(null);
        }
        catch(err){
            console.log('Something went wrong during submit : ', err);
        }
    }

    const deleteTask = async (e) => {
        const taskId = e.target.getAttribute('data-taskid');
        try{
            const response = await axios({
                method: 'delete',
                url: API_ROUTES.DELETE_TASK,
                data: {
                    taskId
                }
            });
            setTasks(tasks.filter(task => task.id != taskId));
        }
        catch(err){
            console.log('Something went wrong during delete : ', err);
        }
    }

    const updateTask = async (e) => {
        const taskId = e.target.getAttribute('data-taskid');
        const statusId = e.target.value;
        try{
            const response = await axios({
                method: 'put',
                url: API_ROUTES.UPDATE_TASK,
                data: {
                    taskId,
                    statusId
                }
            })            
            setTasks(tasks.map((task) => {
                return task.id == response.data.task.id ? response.data.task : task
            }))
        }
        catch(err){
            console.log('Something went wrong during update : ', err);
        }
        
    }

    const logout = async(e) => {
        try {
            const response = await axios({
                method: 'get',
                url: API_ROUTES.LOGOUT
            });
            navigate(APP_ROUTES.SIGN_IN);
        }
        catch(err){
            console.log('Something went wrong during logout : ', err);
        }
    }

    return(
        <div>
            <h1>Home</h1>
            <AddTask 
                title={title} 
                content={content} 
                onTitleChange={handleTitleChange} 
                onContentChange={handleContentChange}
                onFileChange={handleFileChange}
                onSubmitTask={submitTask}
            />
            <ListTasks
                user={user}
                tasks={tasks}
                status={status}
                onGetExtentionFile={getExtensionFile}
                onChangeStatus={updateTask}
                onDeleteTask={deleteTask}
            />
            <button onClick={logout}><span>logout</span></button>
        </div>
    )
    
}

export default Home;