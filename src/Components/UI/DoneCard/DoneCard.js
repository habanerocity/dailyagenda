import React, { useContext } from "react";

import { UserContext } from "../../../store/user-context";

import classes from "./DoneCard.module.css";

import Card from "../Card/Card";

const DoneCard = () => {
    const userCtx = useContext(UserContext);

    const sortCompletedTodos = (todos) => {
        if (!todos) {
          return;
        }

        //Generate new array of completed todos based on completion status
        const completedTodos = todos.filter(todo => Number(todo.completed) === 1);
      
        //Sort completed todos by completedAt timestamp
        completedTodos.sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
      
        //Return sorted todos
        return completedTodos;
      }

    //Sort user todos by completion status
    const sortedCompletedUserTodos = sortCompletedTodos(userCtx.tasksList);

    //Sort guest todos by completion status
    const sortedCompletedGuestTodos = sortCompletedTodos(userCtx.guestTodos);

    return (
        <Card headerName="Done" >
           <div className={classes.add_todos}>
                <div className={classes.todo_container}>
                    {userCtx.jwt ? userCtx.renderTodos(sortedCompletedUserTodos, false) : userCtx.guestUser.isGuest ? userCtx.renderTodos(sortedCompletedGuestTodos, true) : null}
                </div>
           </div>
        </Card>
   );
}

export default DoneCard;