import React, { useContext, useEffect } from 'react';

import { UserContext } from '../../../store/user-context';

import classes from './Login.module.css';
import Header from '../../UI/Header/Header';
import LoginCard from '../../UI/LoginCard/LoginCard';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const userCtx = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        
        if (userCtx.setGuestUser.isGuest) {
            navigate("/");
        }
    }, [userCtx.setGuestUser.isGuest, navigate]);

    return (
        <div className={classes.container}>
            <Header />
            <LoginCard heading="User Login"/>
        </div>
    )
}

export default Login;