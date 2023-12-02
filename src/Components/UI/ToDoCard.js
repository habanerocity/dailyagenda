import React from "react";
import classes from "./ToDoCard.module.css";

import Form from "./Form";

const Card = () => {

  return (
    <div className={classes.card}>
      <Form />
    </div>
  );
};

export default Card;
