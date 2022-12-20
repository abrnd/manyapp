import * as React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { APP_ROUTES } from '../utils/constants';

import SignIn from './signIn';
import SignUp from './signUp';
import Home from './home';


const Index = () => {
    return(
        <BrowserRouter>
           <Routes>
               <Route exact path="/" element={<Navigate to={APP_ROUTES.HOME} />} />
               <Route path={APP_ROUTES.SIGN_UP} exact element={<SignUp />} />
               <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
               <Route path={APP_ROUTES.HOME} element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Index; 