import React from 'react';

import classes from './Register.module.css';
import Header from '../UI/Header';
import UtilityCard from '../UI/UtilityCard';

const Register = () => {
    return (
        <div className={classes.container}>
            <Header />
            <UtilityCard heading="User Registration"/>
        </div>
    )
}

export default Register;