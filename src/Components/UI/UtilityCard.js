import React, { useState } from "react";

import useInput from "../../hooks/useInput";

import user_pic from '../../assets/user_icon.svg';
import check_mark from '../../assets/check.svg';

import classes from "./UtilityCard.module.css";
import Button from "../UI/Button";

const UtilityCard = props => {
  const [ confirmedPassword, setConfirmedPassword ] = useState('');
  const [ confirmedPasswordIsTouched, setConfirmedPasswordIsTouched ] = useState(false);

  const isNotEmpty = value => value.trim() !== "";
  const isEmail = value => value.includes("@") && value.includes(".");
  const isPassword = value => value.length >= 8;

  //extract values via destructuring from useInput custom hook
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

  const passwordMatches = (value, valueTwo) => value === valueTwo;
  
  const confirmedPasswordChangeHandler = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const confirmedPasswordBlurHandler = () => {
    setConfirmedPasswordIsTouched(true);
	};

  const confirmedPasswordHasError = !passwordMatches(enteredPassword, confirmedPassword) && confirmedPasswordIsTouched;

  const resetconfirmedPassword = () => {
		setConfirmedPassword('');
		setConfirmedPasswordIsTouched(false);
	};

  let formIsValid = false;

  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    passwordMatches(enteredPassword, confirmedPassword)
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (
      nameHasError &&
      emailHasError &&
      passwordHasError &&
      confirmedPasswordHasError
    ) {
      return;
    }

    if (!formIsValid) return;

    const formData = {
      fullName: enteredName,
      email: enteredEmail,
      password: confirmedPassword
    }

    const url = 'http://localhost:8888/todo_backend/todo_insert_data.php';

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

    resetName('');
    resetEmail('');
    resetPassword('');
    resetconfirmedPassword('');
  
  }).catch((error) => console.log(error));
  }

  return (
    <div className={classes.card}>
      <div className={classes.header_container}>
        <h1 className={classes.header}>{props.heading}</h1>
        <hr />
        <div className={classes.flex_container}>
          <div className={classes.user_pic_div}>
            <img src={user_pic} alt="user icon" className={classes.user_pic}/>
          </div>
          <div className={classes.form_wrapper}>
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
              className={`${confirmedPasswordHasError ? classes.input_error : null} ${confirmedPasswordHasError ? classes.input_success : null }`}
              placeholder={confirmedPasswordHasError ? 'Password must match!' : 'Confirm Password'} 
              type="password"
              onChange={confirmedPasswordChangeHandler}
              onBlur={confirmedPasswordBlurHandler}
              value={confirmedPassword}  
              />
              <Button type="button" disabled={!formIsValid} id={!formIsValid ? classes.disabled : null}>Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityCard;
