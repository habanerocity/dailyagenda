import React from "react";
import classes from "../UI/Button.module.css";

const Button = props => {
  return (
    <button id={props.id} type="submit" className={`${classes.btn} ${classes.btn__submit}`} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;
