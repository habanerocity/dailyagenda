import React from "react";

import Button from "../Button/Button";

import classes from "./InputTodos.module.css";

const InputTodos = (props) => {

  return (
    <>
      <input
        type="text"
        placeholder={props.placeholder}
        onKeyPress={props.onKeyPress}
        value={props.task}
        onChange={props.change}
      />
      <Button id={classes.field}>{props.name}</Button>
    </>
  );
};

export default InputTodos;
