import { createContext } from 'react';

export const UserContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    logInAsGuest: () => {},
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
    setGuestUserInfo: () => {},
    setGuestTodos: () => {},
    setGuestUser: () => {},
    guestTodos: [],
    setIsLoggedInToFalse: () => {}
});


