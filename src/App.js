import Card from "./Components/UI/Card";
import classes from "./App.module.css";
import Container from "./Components/UI/Container";
import React from "react";
import TaskCard from "./Components/UI/TaskCard";

const App = () => {
  return (
    <div className={classes.App}>
      <Container>
        <Card />
        <TaskCard />
      </Container>
    </div>
  );
};

export default App;
