import React from "react";

import useInput from "../../hooks/useInput";

import user_pic from '../../assets/user_icon.svg';
import classes from "./UtilityCard.module.css";
import Button from "../UI/Button";

const UtilityCard = props => {
  const isNotEmpty = value => value.trim() !== "";
  const isEmail = value => value.includes("@") && value.includes(".");
  const isPassword = value => value.length >= 8;
  const passwordMatches = (valueOne, valueTwo) => valueOne === valueTwo;

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

  let formIsValid = false;

  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (
      nameHasError &&
      emailHasError &&
      passwordHasError
    ) {
      return;
    }

    if (!formIsValid) return;
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
          <form className={classes.user_registration_form} method="POST" onSubmit={formSubmissionHandler}>
            <input 
            className={emailHasError ? classes.input_error : null}
            placeholder={emailHasError ? 'Full name must not be empty!' : 'Email'}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            />
            <input 
            className={emailHasError ? classes.input_error : null}
            placeholder={emailHasError ? 'Email must not be empty!' : 'Email'}
            type="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            />
            <input 
            className={emailHasError ? classes.input_error : null}
            placeholder={emailHasError ? 'Password must be atleast 8 characters!' : 'Password'} 
            type="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword} 
            />
            <input placeholder="Confirm password" type="password" />
            <Button>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UtilityCard;
