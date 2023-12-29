import React, { useEffect, useState } from "react";

import { Link, useNavigate } from 'react-router-dom';

import useInput from "../../../hooks/useInput";
import useApiUrl from "../../../hooks/useApiUrl";

import { registerUser } from "../../../helpers/userRegistrationApiCall";

import { isNotEmpty, isEmail, isPassword, passwordMatches } from '../../../helpers/formValidation';

import user_pic from '../../../assets/user_icon.svg';
import email_icon from '../../../assets/email_off-white.svg';
import lock_icon from '../../../assets/pwd.svg';
import name_icon from '../../../assets/name_icon.svg';
// import check_mark from '../../assets/check.svg';

import classes from "./UserRegistrationCard.module.css";

import UserAuthCard from "../UserAuthCard/UserAuthCard";
import UserIcon from "../UserIcon/UserIcon";
import Button from "../Button/Button";

const UserRegistrationCard = () => {

  const [ confirmedPassword, setConfirmedPassword ] = useState('');
  const [ confirmedPasswordIsTouched, setConfirmedPasswordIsTouched ] = useState(false);
  const [ emailErrorMsg, setEmailErrorMsg ] = useState('');
  const [ nameErrorMsg, setNameErrorMsg ] = useState('');
  const [ passwordErrorMsg, setPasswordErrorMsg ] = useState('');
  const [ confirmedPasswordErrorMsg, setConfirmedPasswordErrorMsg ] = useState('');

  //Initialize programmatic navigation
  const navigate = useNavigate();

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

  //Check to see if confirmed password has an error
  const confirmedPasswordHasError = !passwordMatches(enteredPassword, confirmedPassword) && confirmedPasswordIsTouched;

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
  
  const constructApiUrl = useApiUrl();

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
    const url = constructApiUrl("user_registration.php");

    //Call registerUser function which sends user registration to db
    registerUser(url, formData).then((response) => {
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
  
  }).catch((error) => {
    console.log(error.message);
    setEmailErrorMsg(error.message);
    console.log(emailErrorMsg);
  });
  }

  useEffect(() => {
    setNameErrorMsg('Full name must not be empty!');
  }, [nameHasError]);

  useEffect(() => {
    setPasswordErrorMsg('Password must be atleast 8 characters!');
  }, [passwordHasError]);

  useEffect(() => {
    setConfirmedPasswordErrorMsg('Password must match!');
  }, [confirmedPasswordHasError]);

  return (
      <UserAuthCard headerName="User Registration">
        <h2>Sign up for an account today, it's free.</h2>
        <UserIcon pic={user_pic} />
        <form className={` ${classes.flex__col} ${classes.user_registration_form}`} method="POST" onSubmit={formSubmissionHandler}>
          <div className={classes.input_wrapper}>
            <input 
            className={`${nameHasError ? classes.input_error : null} ${nameIsValid ? classes.input_success : null }`}
            placeholder='Full name'
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            />
            <img src={name_icon} className={classes.input_icon} alt="lock icon" />
          </div>
          {nameHasError ? <p className={classes.error_text}>{nameErrorMsg}</p> : null}
          <div className={classes.input_wrapper}>
            <input 
            className={`${emailHasError ? classes.input_error : null} ${emailIsValid ? classes.input_success : null }`}
            placeholder='Email'
            type="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            />
            <img src={email_icon} className={classes.input_icon} alt="email icon" />
          </div>
          {emailHasError ? <p className={classes.error_text}>Email must not be empty!</p> : null}
          {emailErrorMsg ? <p className={classes.error_text}>{emailErrorMsg}</p> : null}
          <div className={classes.input_wrapper}>
            <input 
            className={`${passwordHasError ? classes.input_error : null} ${passwordIsValid ? classes.input_success : null }`}
            placeholder='Password'
            type="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword} 
            />
            <img src={lock_icon} className={classes.input_icon} alt="email icon" />
          </div>
          {passwordHasError ? <p className={classes.error_text}>{passwordErrorMsg}</p> : null}
          <div className={classes.input_wrapper}>
            <input 
            className={`${confirmedPasswordHasError ? classes.input_error : null} ${passwordMatches(enteredPassword, confirmedPassword) ? classes.input_success : null }`}
            placeholder='Confirm Password'
            type="password"
            onChange={confirmedPasswordChangeHandler}
            onBlur={confirmedPasswordBlurHandler}
            value={confirmedPassword}  
            />
            <img src={lock_icon} className={classes.input_icon} alt="email icon" />
          </div>
          {confirmedPasswordHasError ? <p className={classes.error_text}>{confirmedPasswordErrorMsg}</p> : null}
          <Button type="button" disabled={!formIsValid} id={!formIsValid ? classes.disabled : classes.sign_up_btn}>Submit</Button>
        </form>
        <span>Already have an account?  <Link to="/Login" >Sign in here</Link></span>
      </UserAuthCard>
  );
};

export default UserRegistrationCard;