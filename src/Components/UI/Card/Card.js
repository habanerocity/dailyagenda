import React from 'react';
import classes from './Card.module.css';

import TodoCardHeader from '../TodoCardHeader/TodoCardHeader';

const Card = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes.header_container}>
        <div>
          <TodoCardHeader name={props.headerName} />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Card;