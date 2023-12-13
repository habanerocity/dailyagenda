// import React, { useState, useEffect, useContext } from "react";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';

import useApiUrl from "../../../hooks/useApiUrl";
import useInput from "../../../hooks/useInput";

import user_login_pic from '../../../assets/user_login.svg';
// import check_mark from '../../../assets/check.svg';

import classes from "./LoginCard.module.css";
import Button from "../Button/Button";

import { UserContext } from "../../../store/user-context";

import { isNotEmpty, isEmail } from '../../../helpers/formValidation';

const LoginCard = (props) => {

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  //Import UserContext values
  const userCtx = useContext(UserContext);

  //Initialize navigate variable for programmatic navigation
  const navigate = useNavigate();

  // Initialize refs to keep track of the previous values of jwt and guestUser.isGuest
  const prevJwt = useRef(userCtx.jwt);
  const prevIsGuest = useRef(userCtx.guestUser.isGuest);

  useEffect(() => {
    // Only navigate if jwt has changed from null to a truthy value
    if (prevJwt.current === null && userCtx.jwt) {
      console.log('jwt present. Logging in!');
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
  } = useInput(isNotEmpty && isEmail);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isNotEmpty);

  //Initialize formIsValid variable as false
  let formIsValid = false;

  //Frontend validation that checks if email and password are valid, then sets formIsValid to true 
  if (
    emailIsValid &&
    passwordIsValid
  ) {
    formIsValid = true;
  }

  //Import constructApiUrl function from useApiUrl custom hook
  const constructApiUrl = useApiUrl();

  //Handler function that is performed if formIsValid
  const formSubmissionHandler = (e) => {
    e.preventDefault();

    //If email or password has an error stop function
    if (
      emailHasError &&
      passwordHasError
    ) {
      return;
    }

    //If form is not valid stop function
    if (!formIsValid) return;

    //Initialize object that is sent to db
    const formData = {
      email: enteredEmail,
      password: enteredPassword
    }

    //Construct api url endpoint
    const url = constructApiUrl("user_login.php");

    //Perform 'POST' request to perform user authentication
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
    const { result, token, full_name } = data;
    
    //If token is performed, set it in local storage as well as user's full_name
    if(token){
      localStorage.setItem('jwtToken', token);
      localStorage.setItem("userFullName", full_name);

      //Retrieve jwt from local storage
      const jwt = localStorage.getItem('jwtToken');

      //If jwt is set in local storage setIsLoggedIn to true and set the user's full_name
      if (jwt){
        userCtx.setIsLoggedIn(true);
        userCtx.setUserFullName(full_name);
      } 
    } else {
      setError(true);
      setErrorMsg(result);
    }

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
            <form className={classes.user_login_form} method="POST" onSubmit={formSubmissionHandler}>
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
              <div className={classes.error__msg}>
                {error ? <p>{errorMsg}</p> : null}
              </div>
              <div className={classes.btn_container}>
                <Button type="button" disabled={!formIsValid} id={!formIsValid ? classes.disabled : null}>Login</Button>
                <div className={classes.or}>
                    <hr className={classes.line} />
                    <h6>OR</h6>
                    <hr className={classes.line} />
                </div>
                    <Button type="button" onClick={userCtx.logInAsGuest} id={classes.guest_btn}>Login as Guest</Button>
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