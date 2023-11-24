import { useState } from 'react';

//Custom Hook that uses a function parameter that validates form inputs and returns input functions

const useInput = (validateValue) => {
	const [ enteredValue, setEnteredValue ] = useState('');
	const [ isTouched, setIsTouched ] = useState(false);

	const valueIsValid = validateValue(enteredValue);
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