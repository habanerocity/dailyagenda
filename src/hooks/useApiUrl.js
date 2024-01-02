// useApiUrl.js
import { useCallback } from 'react';

const useApiUrl = () => {
  const constructApiUrl = useCallback((scriptName) => {
    return `${process.env.REACT_APP_DAILY_AGENDA_API_BASE}/${scriptName}`;
  }, []);

  return constructApiUrl;
};

export default useApiUrl;