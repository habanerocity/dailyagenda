import React from "react";

import classes from "./UtilityCard.module.css";

import CompletedTasks from "./CompletedTasks/CompletedTasks";

const UtilityCard = props => {
  const deleteHandler = deletedTaskData => {
    //lifting state up to parent component
    props.finishTask(deletedTaskData);
  };

  return (
    <div className={classes.card}>
      <div className={classes.header_container}>
        <h1 className={classes.header}>DONE</h1>
        <hr />
        <div>
          {props.completedErrands.map((task, index) => {
            console.log(index);
            return (
              <CompletedTasks
                assignment={task.completed}
                agenda={task.data}
                key={task.id}
                index={index}
                taskIsGone={deleteHandler}
                job={props.tasks}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UtilityCard;
