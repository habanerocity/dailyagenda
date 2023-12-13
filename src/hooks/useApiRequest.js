import { useContext } from 'react';

import { UserContext } from '../store/user-context';

//Custom hook to make API requests
const useApiRequest = (url, method) => {
  const userCtx = useContext(UserContext);

  const apiRequest = async (body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userCtx.jwt}`
        },
        body: body ? JSON.stringify(body) : undefined
      });

      if(response.ok){
        userCtx.fetchData();
        console.log("Request successful!");
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message );
    }
  };

  return apiRequest;
};

export default useApiRequest;