// useApi.js
import { useCallback } from 'react';
import useApiUrl from './useApiUrl';

const useApi = (jwt, setTasksList) => {
  const constructApiUrl = useApiUrl();

  const fetchData = useCallback(async () => {
    if(jwt){
        const url = constructApiUrl("fetch_todos.php");
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwt}`
            },
          });
    
          if (response.ok) {
            const data = await response.json();
       
            // Update state with the fetched data
            setTasksList(data); 
          } else {
            console.error("Error:", response.status);
          }
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
  }, [jwt, constructApiUrl, setTasksList]);

  const sendTaskToDb = async (val) => {
    if(jwt){

        //Initialize task object to send todos to db
        const taskObj = {
          data: val,
          completed: 0
        };
    
        const url = constructApiUrl("insert_todos.php");
    
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(taskObj),
          });
    
          if (response.ok) {
            //After successfully inserting todos in db, fetch the updated list of todos from db
            fetchData();
          } else {
            console.error("Error:", response.status);
          }
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
  };

  return { fetchData, sendTaskToDb };
};

export default useApi;