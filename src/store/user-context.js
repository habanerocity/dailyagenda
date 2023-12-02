import { createContext } from 'react';

export const UserContext = createContext({
    isLoggedIn: false,
    userFullName: '',
    setIsLoggedIn: () => {},
    tasksList: [],
    setTasksList: () => {},
    fetchData: () =>{},
    enteredTask: '',
    setEnteredTask: () => {},
    addTaskHandler: () => {}
});


