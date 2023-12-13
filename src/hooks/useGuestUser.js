// useGuestUser.js
import { useState } from 'react';

const useGuestUser = () => {
  const [guestUser, setGuestUser] = useState(null);

  const generateGuestId = () => {
    return `guest_${Math.random().toString(36).substr(2, 9)}`;
  };

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

  return { guestUser, setGuestUser, setGuestUserInfo };
};

export default useGuestUser;