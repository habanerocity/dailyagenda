import React, { useState, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom';

import useInput from "../../hooks/useInput";

import user_login_pic from '../../assets/user_login.svg';
import check_mark from '../../assets/check.svg';

import classes from "./UtilityCard.module.css";
import Button from "../UI/Button";

const LoginCard = props => {

  const [redirectToHome, setRedirectToHome] = useState(false);

  const isNotEmpty = value => value.trim() !== "";
  const isEmail = value => value.includes("@") && value.includes(".");

  //Check ot see if a JWT is stored in local storage
  useEffect(() => {
    const jwt = localStorage.getItem('jwtToken');

    if(jwt) {
      //Redirect to the todo app if JWT is present
      setRedirectToHome(true);
      console.log('jwt present. Logging in!');
    }
  }, []);

  //extract values via destructuring from useInput custom hook

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail
  } = useInput(isNotEmpty && isEmail);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword
  } = useInput(isNotEmpty);

  if(redirectToHome) {
    return <Navigate to="/" />;
  }

  let formIsValid = false;

  if (
    emailIsValid &&
    passwordIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (
      emailHasError &&
      passwordHasError
    ) {
      return;
    }

    if (!formIsValid) return;

    const formData = {
      email: enteredEmail,
      password: enteredPassword
    }

    console.log(formData);

    const url = 'http://localhost:8888/todo_backend/user_login.php';

    fetch(url, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  }).then((response) => {
  if(response.ok){
    if (response.headers.get('content-length') === '0') {
        throw new Error('Empty response');
      }

    return response.json();
  } else {
    throw new Error(`Error: ${response.status}`);
  }})
  .then((data) => { if(data){

    const { result, token } = data;
    console.log(result);
    console.log(token);

    localStorage.setItem('jwtToken', token);
    
    // setRedirectToHome(true);
  
  }}).catch((error) => console.log(error));
  }

  return (
    <div className={classes.card}>
      <div className={classes.header_container}>
        <h1 className={classes.header}>{props.heading}</h1>
        <hr />
        <div className={classes.flex_container}>
          <div className={classes.user_pic_div}>
            <img src={user_login_pic} alt="user icon" className={classes.user_pic}/>
          </div>
          <div className={classes.form_wrapper}>
            <form className={classes.user_registration_form} method="POST" onSubmit={formSubmissionHandler}>
              <input 
              className={`${emailHasError ? classes.input_error : null} ${emailIsValid ? classes.input_success : null }`}
              placeholder={emailHasError ? 'Email must not be empty!' : 'Email'}
              type="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              />
              <input 
              className={`${passwordHasError ? classes.input_error : null} ${passwordIsValid ? classes.input_success : null }`}
              placeholder={passwordHasError ? 'Please enter your password!' : 'Password'} 
              type="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword} 
              />
              <div className={classes.btn_container}>
                <Button type="button" disabled={!formIsValid} id={!formIsValid ? classes.disabled : null}>Login</Button>
                <div className={classes.or}>
                    <hr className={classes.line} />
                    <h6>OR</h6>
                    <hr className={classes.line} />
                </div>
                <Link to="/">
                        <Button type="button" id={classes.guest_btn}>Login as Guest</Button>
                </Link>
              </div>
              <span>Don't have an account?  <Link to="/Register" >Sign up here</Link></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
