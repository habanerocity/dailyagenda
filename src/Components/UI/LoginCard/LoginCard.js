import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';

import useApiUrl from "../../../hooks/useApiUrl";
import useInput from "../../../hooks/useInput";

import daily_agenda_logo from '../../../assets/daily_agenda_logo-2.png';
import email_icon from '../../../assets/email_off-white.svg';
import lock_icon from '../../../assets/pwd.svg';
import classes from "./LoginCard.module.css";

import UserAuthCard from "../UserAuthCard/UserAuthCard";
import UserIcon from "../UserIcon/UserIcon";
import Button from "../Button/Button";

import { UserContext } from "../../../store/user-context";

import { isNotEmpty, isEmail } from '../../../helpers/formValidation';

const LoginCard = (props) => {

  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [formIsTouched, setFormIsTouched] = useState(false);
  
  const userCtx = useContext(UserContext);

  const navigate = useNavigate();

  // Initialize refs to keep track of the previous values of jwt and guestUser.isGuest
  const prevJwt = useRef(userCtx.jwt);
  const prevIsGuest = useRef(userCtx.guestUser.isGuest);

  useEffect(() => {
    // Only navigate if jwt has changed from null to a truthy value
    if (prevJwt.current === null && userCtx.jwt) {
      navigate("/");
    }
    // Update the previous value of jwt
    prevJwt.current = userCtx.jwt;
  }, [navigate, userCtx.jwt]);

  useEffect(() => {
    // Only navigate if guestUser.isGuest has changed from false to true
    if (prevIsGuest.current === false && userCtx.guestUser.isGuest) {
      navigate("/");
    }
    // Update the previous value of guestUser.isGuest
    prevIsGuest.current = userCtx.guestUser.isGuest;
  }, [navigate, userCtx.guestUser.isGuest]);

  //extract input helpers via destructuring from useInput custom hook
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isNotEmpty && isEmail, usernameErrorMsg);

  //If user email is not valid and user tries to reenter email, clear error message
  const handleEmailChange = (e) => {
    emailChangeHandler(e);
    setUsernameErrorMsg('');
  };

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isNotEmpty, passwordErrorMsg);

  //If user password is not valid and user tries to reenter password, clear error message
  const handlePasswordChange = (e) => {
    passwordChangeHandler(e);
    setPasswordErrorMsg('');
  };

  useEffect(() => {
    // Update formIsValid every time emailIsValid or passwordIsValid changes
    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [emailIsValid, passwordIsValid]);

  //Import constructApiUrl function from useApiUrl custom hook
  const constructApiUrl = useApiUrl();

  //Handler function that is performed if formIsValid
  const formSubmissionHandler = (e) => {
    e.preventDefault();

    setFormIsTouched(true);

    if (
      emailHasError &&
      passwordHasError
    ) {
      return;
    }

    if (!formIsValid) return;

    //Initialize object that is sent to db
    const formData = {
      email: enteredEmail,
      password: enteredPassword
    }

    //Construct api url endpoint
    const url = constructApiUrl("user_login.php");

    //Perform user authentication
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
    //Destructure keys from data object from backend response
    const { token, full_name } = data;
    
    //If token is performed, set it in local storage as well as user's full_name
    if(token){
      localStorage.setItem('jwtToken', token);
      localStorage.setItem("userFullName", full_name);

      const jwt = localStorage.getItem('jwtToken');

      //If jwt is set in local storage setIsLoggedIn to true and set the user's full_name
      if (jwt){
        userCtx.setIsLoggedIn(true);
        userCtx.setUserFullName(full_name);
      } 
    } else {
      if(data.pass_error){
        setPasswordErrorMsg(data.pass_error);
      }

      if(data.username_error){
        setUsernameErrorMsg(data.username_error);
      }
    }
  }}).catch((error) =>{ 
  console.log(error);
  // Reset formIsValid state when form submission fails
  setFormIsValid(false);
  })}

  return (
        <UserAuthCard headerName="User Login">
          <UserIcon pic={daily_agenda_logo} />
          <div className={classes.form_wrapper}>
            <form className={classes.user_login_form} method="POST" onSubmit={formSubmissionHandler}>
              <div className={classes.input_wrapper}>
                <input 
                id={classes.email}
                className={`${emailHasError ? classes.input_error : null} ${emailIsValid ? classes.input_success : null }`}
                placeholder="Email"
                type="email"
                onChange={handleEmailChange}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                />
                <img src={email_icon} className={classes.input_icon} alt="email icon" />
              </div>
              <div className={classes.error__msg}>
                {usernameErrorMsg ? <p>{usernameErrorMsg}</p> : emailHasError ? <p>Please enter your email</p> : null}
              </div>
              <div className={classes.input_wrapper}>
                <input 
                id={classes.password}
                className={`${passwordHasError ? classes.input_error : null} ${passwordIsValid ? classes.input_success : null }`}
                placeholder="Password" 
                type="password"
                onChange={handlePasswordChange}
                onBlur={passwordBlurHandler}
                value={enteredPassword} 
                />
                <img src={lock_icon} className={classes.lock_icon} alt="email icon" />
              </div>
              <div className={classes.error__msg}>
                { passwordErrorMsg ? <p>{passwordErrorMsg}</p> : passwordHasError ? <p>Please enter your password</p> : null}
              </div>
              <div className={`${classes.flex_center} ${classes.btn_container}`}>
                <Button type="button" disabled={!formIsValid && formIsTouched}  id={!formIsValid ? classes.disabled : classes.login_btn}>Login</Button>
                <div className={`${classes.flex_center} ${classes.or}`}>
                  <hr className={classes.line} />
                  <h6>OR</h6>
                  <hr className={classes.line} />
                </div>
                  <Button type="button" onClick={userCtx.logInAsGuest} id={classes.guest_btn}>Login as Guest</Button>
              </div>
              <span>Don't have an account?  <Link to="/Register" >Sign up here</Link></span>
            </form>
          </div>
      </UserAuthCard>
  );
};

export default LoginCard;