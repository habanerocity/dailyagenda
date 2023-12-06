import React from 'react';

import classes from './Login.module.css';
import Header from '../../UI/Header/Header';
import LoginCard from '../../UI/LoginCard/LoginCard';

const Login = () => {
    return (
        <div className={classes.container}>
            <Header />
            <LoginCard heading="User Login"/>
        </div>
    )
}

export default Login;