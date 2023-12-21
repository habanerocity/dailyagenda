import { useState } from 'react';

//Custom Hook that uses a function parameter that validates form inputs and returns input functions

const useInput = (validateValue, valueHasErrorMsg) => {
	const [ enteredValue, setEnteredValue ] = useState('');
	const [ isTouched, setIsTouched ] = useState(false);

	let valueIsValid = validateValue(enteredValue);

	//If valueHasErrorMsg is true, set valueIsValid to false
	if (valueHasErrorMsg) {
		valueIsValid = false;
	  }

	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (e) => {
		setEnteredValue(e.target.value);
	};

	const inputBlurHandler = () => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};
	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset
	};
};

export default useInput;