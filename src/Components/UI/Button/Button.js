import React from "react";
import classes from "./Button.module.css";

const Button = props => {
  return (
    <button id={props.id} onClick={props.onClick} type="submit" className={`${classes.btn} ${classes.btn__submit}`} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;
