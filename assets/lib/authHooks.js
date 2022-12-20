import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../utils/constants';
import { getAuthenticatedUser } from './common';

export function useUser(){
    const [user, setUser] = React.useState(null);
    const [authenticated, setAuthenticated] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function getUserDetails() {
            const {authenticated, user} = await getAuthenticatedUser();
            if(!authenticated){
                navigate(APP_ROUTES.SIGN_IN);
                return;
            }
            setUser(user);
            setAuthenticated(authenticated);
        }
        getUserDetails();
    }, []);

    return {user, authenticated};
}