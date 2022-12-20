import axios from 'axios';
import { API_ROUTES } from '../utils/constants';


export async function getAuthenticatedUser(){
    const defaultReturnObject = { authenticated: false, user: null};
    try{
        const response = await axios({
            method: 'GET',
            url: API_ROUTES.GET_USER,
        });
        const { authenticated = false} = response.data;
        return authenticated ? response.data : false;
    }
    catch (err) {
        console.log('getAuthenticatedUser, Something Went Wrong', err);
        return defaultReturnObject;
    }
}
