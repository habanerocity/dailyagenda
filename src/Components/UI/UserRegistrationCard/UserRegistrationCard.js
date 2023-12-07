import React, { useState, useContext } from "react";

import { Link, useNavigate } from 'react-router-dom';

import useInput from "../../../hooks/useInput";

import { UserContext } from "../../../store/user-context";

import user_pic from '../../../assets/user_icon.svg';
// import check_mark from '../../assets/check.svg';

import classes from "./UserRegistrationCard.module.css";
import Button from "../Button/Button";

const UserRegistrationCard = props => {
  // console.log('utility card');
  const [ confirmedPassword, setConfirmedPassword ] = useState('');
  const [ confirmedPasswordIsTouched, setConfirmedPasswordIsTouched ] = useState(false);

  //Initialize programmatic navigation
  const navigate=useNavigate();

  //Import UserContext
  const userCtx = useContext(UserContext);

  //Form validation functions
  const isNotEmpty = value => value.trim() !== "";
  const isEmail = value => value.includes("@") && value.includes(".");
  const isPassword = value => value.length >= 8;

  //Check to see if password and confirmedPassword match
  const passwordMatches = (value, valueTwo) =>isNotEmpty(value) && isNotEmpty(valueTwo) && value === valueTwo;

  //Check to see if confirmed password has an error
  const confirmedPasswordHasError = !passwordMatches(enteredPassword, confirmedPassword) && confirmedPasswordIsTouched;

  //Extract values via destructuring from useInput custom hook
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInput(isNotEmpty);

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
  } = useInput(isNotEmpty && isPassword);

  //Set confirmed password on keystroke
  const confirmedPasswordChangeHandler = (e) => {
    setConfirmedPassword(e.target.value);
  };

  //State variable that checks to see if confirmed password has been touched
  const confirmedPasswordBlurHandler = () => {
    setConfirmedPasswordIsTouched(true);
	};

  //Reset confirmed Password field
  const resetconfirmedPassword = () => {
		setConfirmedPassword('');
		setConfirmedPasswordIsTouched(false);
	};

  //Initialize formIsValid variable to false
  let formIsValid = false;

  //If name, email, and password fields are valid set formIsValid to true
  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    passwordMatches(enteredPassword, confirmedPassword)
  ) {
    formIsValid = true;
  }

  //Function that sends user registration to db
  const formSubmissionHandler = (e) => {
    e.preventDefault();

    //Check to see if input fields have an error, if they do stop the function
    if (
      nameHasError &&
      emailHasError &&
      passwordHasError &&
      confirmedPasswordHasError
    ) {
      return;
    }

    //If form is not valid stop the function
    if (!formIsValid) return;

    //Initialize formData object that will be sent to db
    const formData = {
      fullName: enteredName,
      email: enteredEmail,
      password: confirmedPassword
    }

    //Contruct url endpoint
    const url = userCtx.constructApiUrl("user_registration.php");

    //Send data to db
    fetch(url, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  }).then((response) => {
  if(response.ok){
    console.log('Success: ' + response.status);

    return response.json();
  } else {
    console.log('Error: ' + response.status);
  }})
  .then((data) => { if(data){
    console.log(data)}

    //Reset input fields
    resetName('');
    resetEmail('');
    resetPassword('');
    resetconfirmedPassword('');

    // setRedirectToLogin(true);
    navigate("/Login");
  
  }).catch((error) => console.log(error));
  }

  return (
    <div className={classes.card}>
      <div className={classes.header_container}>
        <h1 className={classes.header}>{props.heading}</h1>
        <hr />
        <h2>Sign up for an account today, it's free.</h2>
        <div>
          <div className={classes.user_pic_div}>
            <img src={user_pic} alt="user icon" className={classes.user_pic}/>
          </div>
            <form className={classes.user_registration_form} method="POST" onSubmit={formSubmissionHandler}>
              <input 
              className={`${nameHasError ? classes.input_error : null} ${nameIsValid ? classes.input_success : null }`}
              placeholder={nameHasError ? 'Full name must not be empty!' : 'Full name'}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
              />
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
              placeholder={passwordHasError ? 'Password must be atleast 8 characters!' : 'Password'} 
              type="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword} 
              />
              <input 
              className={`${confirmedPasswordHasError ? classes.input_error : null} ${passwordMatches(enteredPassword, confirmedPassword) ? classes.input_success : null }`}
              placeholder={confirmedPasswordHasError ? 'Password must match!' : 'Confirm Password'} 
              type="password"
              onChange={confirmedPasswordChangeHandler}
              onBlur={confirmedPasswordBlurHandler}
              value={confirmedPassword}  
              />
              <Button type="button" disabled={!formIsValid} id={!formIsValid ? classes.disabled : null}>Submit</Button>
            </form>
            <span>Already have an account?  <Link to="/Login" >Sign in here</Link></span>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationCard;