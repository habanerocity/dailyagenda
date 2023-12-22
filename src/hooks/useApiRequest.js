import { useContext } from 'react';

import { UserContext } from '../store/user-context';
import { AuthContext } from '../store/AuthContext';

//Custom hook to make API requests
const useApiRequest = (url, method) => {

  //Import userContext and authContext
  const userCtx = useContext(UserContext);
  const authCtx = useContext(AuthContext);

  const apiRequest = async (body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authCtx.jwt}`
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