import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_ROUTES, APP_ROUTES } from '../utils/constants';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [admin, setAdmin] = React.useState(false);

    const signUp = async (e) => {
        e.preventDefault();
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
        <div className="d-flex h-100">
            <Card style={{ width: '18rem', margin: 'auto'}} className="text-center my-auto">
                <Card.Header>Sign Up</Card.Header>
                <Card.Body>
                    <Form>
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
                        <Form.Group>
                            <Form.Label>Administrateur </Form.Label>
                            <Form.Check 
                                type="switch"
                                name="admin"
                                onChange={(e) => setAdmin(e.target.checked)}
                            />
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            style={{ marginLeft: 'auto', marginRight: 'auto'}}
                            onClick={signUp}
                        >
                            Sign In
                        </Button>                                         
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <span>Already a user </span>
                    <Link to="/signin">
                        <span>Sign in</span>
                    </Link>
                </Card.Footer>
            </Card>
        </div>
    )
}

/*
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


*/

export default SignUp;