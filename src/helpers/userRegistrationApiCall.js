//Perform fetch request to register user
export function registerUser(url, formData) {
  
    return fetch(url, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to register user');
      }
    });
  }