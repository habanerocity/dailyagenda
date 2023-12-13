// useGuestTodos.js
import { useState, useEffect } from 'react';

const useGuestTodos = () => {
  const getGuestTodosFromLocalStorage = () => {
    let guestTodos = localStorage.getItem("todos");
  
    if (guestTodos) {
      return JSON.parse(guestTodos);
    } else {
      return [];
    }
  };

  const [guestTodos, setGuestTodos] = useState(getGuestTodosFromLocalStorage());

  useEffect(() => {
    const handleStorageChange = () => {
      setGuestTodos(getGuestTodosFromLocalStorage());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addGuestTodo = (todo) => {
    const updatedGuestTodos = [...guestTodos, todo];
    setGuestTodos(updatedGuestTodos);
    localStorage.setItem("todos", JSON.stringify(updatedGuestTodos));
  };

  return [guestTodos, setGuestTodos, addGuestTodo];
};

export default useGuestTodos;