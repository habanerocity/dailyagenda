  //Form validation functions
  export const isNotEmpty = value => value.trim() !== "";
  export const isEmail = value => value.includes("@") && value.includes(".");
  export const isPassword = value => value.length >= 8;

  //Check to see if password and confirmedPassword match
  export const passwordMatches = (value, valueTwo) =>isNotEmpty(value) && isNotEmpty(valueTwo) && value === valueTwo;