import React from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../lib/authHooks';
import { API_ROUTES, APP_ROUTES } from '../utils/constants';



const SignIn = (props) => {
    const navigate = useNavigate();
    const {user, authentificated} = useUser();
    if( user || authentificated){
        navigate(APP_ROUTES.HOME);
    }

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [notif, setNotif] = React.useState(false);
    const hasNaviguate = useLocation();

    React.useEffect( () => {
        if(hasNaviguate.state){
            setNotif(true);
        }
    });

    const signIn = async () => {
        try{
            const response = await axios({
                method: 'post',
                url: API_ROUTES.SIGN_IN,
                data: {
                    username,
                    password
                }
            });
            if(!response?.data === null){
                console.log('Something went wrong during signing in', response);
                return;
            }
            navigate(APP_ROUTES.HOME);
        }
        catch(err){
            console.log('Something went wrong during signing in', err);
        }

    };

    return(
        <div>
            <h2>Sign In</h2>
            <div>
                {( () => {
                    if(notif){
                        return <div>Utilisateur créer</div>
                    }
                })()}
                <input 
                    type="email"
                    placeholder="Username"
                    value={username}
                    onChange={ (e) => {setUsername(e.target.value); }}
                />
                <input 
                    type="password"
                    placeholder="*****"
                    value={password}
                    onChange={ (e) => {setPassword(e.target.value); }}
                />
                <button onClick={signIn}>
                    <span>Sign In</span>
                </button>

            </div>
            <div>
                Not a user?
                <Link to="/signup">
                    <span>Sign up</span>
                </Link>
            </div>
        </div>
    )

}

export default SignIn;