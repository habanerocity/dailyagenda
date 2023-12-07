import React from "react";

import Button from "./Button/Button";

const SearchBar = props => {

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
