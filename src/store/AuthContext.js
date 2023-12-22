import React, { createContext, useState } from "react";

export const AuthContext = createContext({
    handleSetUserFullName: () => {}
    // other context values...
  });

export const AuthProvider = ({ children }) => {
  // Check to see if there is a jwt in local storage, then set isLoggedIn to true if jwt is found. !! operator is a common way to convert a value to a boolean in js
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwtToken'));

  //Initialize guest login state object
  const [guestUser, setGuestUser] = useState({
    isGuest: false,
    guestId: ""
  }); 

  //State variable that tracks a registered user's full name
//   const [userFullName, setUserFullName] = useState('');

  //Function to generate a unique guest ID
  const generateGuestId = () => {
    return `guest_${Math.random().toString(36).substr(2, 9)}`;
  };

    // Function to set guest user state
    const setGuestUserInfo = () => {

        //Variable that stores a unique guest ID
        const newGuestId = generateGuestId();

        //Set guest user state
        setGuestUser({
            isGuest: true,
            guestId: newGuestId
        });

        //Saves guest ID to local storage
        localStorage.setItem("guestId", newGuestId);
        }

  //Invert the state of isLoggedIn
  const handleIsLoggedIn = () => {
  if(isLoggedIn){
    setIsLoggedIn(false);
  } else if(!isLoggedIn){
    setIsLoggedIn(true);
  }
  }

  //Set registered user's full name
//   const handleSetUserFullName = (val) => {
//     setUserFullName(val);
//     console.log(val);
//   }

  //Set guest user information upon guest login
  const handleLogInAsGuest = () => {
    setGuestUserInfo();
  }

  //Retrieve jwt from local storage
  const jwt = localStorage.getItem('jwtToken');

  const authCtxValue = {
    isLoggedIn,
    handleIsLoggedIn,
    jwt,
    // userFullName,
    // handleSetUserFullName,
    guestUser,
    handleLogInAsGuest
  };
  

  return (
    <AuthContext.Provider value={authCtxValue}>
      {children}
    </AuthContext.Provider>
  );
}