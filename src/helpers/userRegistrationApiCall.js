//Perform fetch request to register user
export async function registerUser(url, formData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}