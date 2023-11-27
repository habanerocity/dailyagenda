import React from 'react';

import classes from './Register.module.css';
import Header from '../UI/Header';
import LoginCard from '../UI/LoginCard';

const Login = () => {
    return (
        <div className={classes.container}>
            <Header />
            <LoginCard heading="User Login"/>
        </div>
    )
}

export default Login;