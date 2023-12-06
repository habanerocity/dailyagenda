import { createContext } from 'react';

export const UserContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    tasksList: [],
    setTasksList: () => {},
    fetchData: () =>{},
    enteredTask: '',
    setEnteredTask: () => {},
    addTaskHandler: () => {},
    redirectToLogin: '',
    setRedirectToLogin: () => {},
    setUserFullName: () => {},
    userFullName: '',
    constructApiUrl: () => {},
    fetchTodosCallback: () => {},
    apiRequest: () => {}
});


