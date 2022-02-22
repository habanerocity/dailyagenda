import React from "react";
import classes from "./TaskCard.module.css";
import NewTasks from "./NewTasks/NewTasks";

const TaskCard = props => {
  return (
    <div className={classes.newCard}>
      <h1 className={classes.headliner}>Pending Tasks ({props.job.length})</h1>
      {props.job.map((task, index) => {
        console.log(index);
        return (
          <NewTasks
            assignment={task.completed}
            taskIsGone={props.taskRemoved}
            accomplishedTask={props.taskIsDone}
            agenda={task.data}
            key={task.id}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default TaskCard;
