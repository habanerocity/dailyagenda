// useApiUrl.js
import { useCallback } from 'react';

const useApiUrl = () => {
  const constructApiUrl = useCallback((scriptName) => {
    return `http://localhost:8888/todo_backend/${scriptName}`;
  }, []);

  return constructApiUrl;
};

export default useApiUrl;