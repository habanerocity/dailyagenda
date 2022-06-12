import React from "react";

import classes from "./UtilityCard.module.css";

const UtilityCard = props => {
  // const saveTaskDataHandler = enteredTaskData => {
  //   //lifting state up to parent component
  //   props.onAddTask(enteredTaskData);
  // };

  return (
    <div className={classes.card}>
      <div className={classes.header_container}>
        <h1 className={classes.header}>{props.cardTitle}</h1>
        <hr />
      </div>
    </div>
  );
};

export default UtilityCard;
