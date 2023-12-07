// import React, { useState, useEffect, useContext } from "react";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

import useInput from "../../../hooks/useInput";

import user_login_pic from '../../../assets/user_login.svg';
// import check_mark from '../../../assets/check.svg';

import classes from "./LoginCard.module.css";
import Button from "../Button/Button";

import { UserContext } from "../../../store/user-context";

const LoginCard = props => {
  // console.log('rendering login card');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  //Import UserContext values
  const userCtx = useContext(UserContext);

  //Initialize navigate variable for programmatic navigation
  const navigate = useNavigate();

  //Form validation variables
  const isNotEmpty = value => value.trim() !== "";
  const isEmail = value => value.includes("@") && value.includes(".");

  //Check to see if a JWT is stored in local storage, then login automatically
  useEffect(() => {
    if(userCtx.jwt) {
      //Redirect to the todo app if JWT is present 
        console.log('jwt present. Logging in!');
        navigate("/");
    }
  }, [navigate]);

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
    const url = userCtx.constructApiUrl("user_login.php");

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

    console.log(full_name);
    
    //If token is performed, set it in local storage as well as user's full_name
    if(token){
      localStorage.setItem('jwtToken', token);
      localStorage.setItem("userFullName", full_name);

      const jwt = localStorage.getItem('jwtToken');
      console.log(localStorage.getItem("userFullName"));

      //If jwt is set in local storage setIsLoggedIn to true and set the user's full_name
      if (jwt){
        console.log(`Token: ${jwt}`);
        userCtx.setIsLoggedIn(true);
        userCtx.setUserFullName(full_name);
        console.log(userCtx.userFullName);
        navigate("/");
      } 
    } else {
      console.log('no token stored!');
      setError(true);
      setErrorMsg(result);
    }

  }}).catch((error) => console.log(error));
  }

  // const handleClick = () => {
  //   console.log('guest button has been clicked');
  // }

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
                {error && <p>{errorMsg}</p>}
              </div>
              <div className={classes.btn_container}>
                <Button type="button" disabled={!formIsValid} id={!formIsValid ? classes.disabled : null}>Login</Button>
                <div className={classes.or}>
                    <hr className={classes.line} />
                    <h6>OR</h6>
                    <hr className={classes.line} />
                </div>
                <Link to="/">
                    <Button type="button" onClick={userCtx.logInAsGuest} id={classes.guest_btn}>Login as Guest</Button>
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