import React from "react";

import Button from "./UI/Button";

const SearchBar = props => {
  //   const [location, setLocation] = useState("");

  // const submitHandler = e => {
  //   e.preventDefault();

  //   //form validation to make sure empty string is not submitted
  //   if (location().length === 0) {
  //     return;
  //   }
  //   //Lifting state up to Parent component
  //   props.onSaveTaskData(enteredTask);
  //   //resetting input field
  //   setEnteredTask("");
  // };

  return (
    <>
      <input
        type="text"
        id="field"
        placeholder={props.placeholder}
        onKeyPress={props.onKeyPress}
        value={props.task}
        onChange={props.change}
      />
      <Button>{props.name}</Button>
    </>
  );
};

export default SearchBar;
