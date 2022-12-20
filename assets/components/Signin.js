import React from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../lib/authHooks';
import { API_ROUTES, APP_ROUTES } from '../utils/constants';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

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

    const signIn = async (e) => {
        e.preventDefault();
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
        <div className="d-flex h-100">
            <Card style={{ width: '18rem', margin: 'auto'}} className="text-center my-auto">
                <Card.Header>Sign In</Card.Header>
                <Card.Body>
                    <Form>
                        <div>
                            {( () => {
                                if(notif){
                                    return <Alert variant="success">Utilisateur créé</Alert>
                                }
                            })()}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Username"
                                    value={username}
                                    onChange={ (e) => {setUsername(e.target.value); }}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group  className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="******"
                                    value={password}
                                    onChange={ (e) => {setPassword(e.target.value); }}
                                />
                            </Form.Group>
                            <Button 
                                variant="primary" 
                                type="submit" 
                                style={{ marginLeft: 'auto', marginRight: 'auto'}}
                                onClick={signIn}
                            >
                                    Sign In
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <span>Not a user? </span>
                    <Link to="/signup">
                        <span>Sign up</span>
                    </Link>
                </Card.Footer>
            </Card>
        </div> 
    );  

}

export default SignIn;