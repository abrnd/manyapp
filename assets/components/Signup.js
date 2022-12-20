import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES, APP_ROUTES } from '../utils/constants';



const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [admin, setAdmin] = React.useState(false);

    const signup = async () => {
        try{
            const response = await axios({
                method: 'post',
                url: API_ROUTES.SIGN_UP,
                data: {
                    username,
                    password,
                    admin
                }
            });
            navigate(APP_ROUTES.SIGN_IN, {state: {notifUser: true}});
        }
        catch(err){
            console.log('Something went wrong during signing up : ', err);
        }
    };

    return(
        <div>
            <h2>Sign Up</h2>
            <div>
                <input 
                    type="email"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); }}
                />
                <input 
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                />
                <div>
                    <div>Admin</div>
                    <input 
                        type="checkbox"
                        name="admin"
                        onChange={ (e) => setAdmin(e.target.checked)}
                    />
                </div>
                <button
                    onClick={signup}
                >
                    <span>Sign Up</span>
                </button>
            </div>
        </div>
    )
}

export default SignUp;