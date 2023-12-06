import React from 'react';

import classes from './Register.module.css';
import Header from '../UI/Header';
import UserRegistrationCard from '../UI/UtilityCard';

const Register = () => {
    return (
        <div className={classes.container}>
            <Header />
            <UserRegistrationCard heading="User Registration"/>
        </div>
    )
}

export default Register;