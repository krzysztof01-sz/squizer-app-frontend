const baseURL = 'http://localhost:8080';

export const addUser = async (formData, csrfToken) => {
  const feedback = await fetch(`${baseURL}/api/adduser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CSRF-Token': csrfToken,
    },
    body: JSON.stringify({ ...formData, csrfToken }),
  });

  return await feedback.json();
};

export const loginUser = async (formData, csrfToken) => {
  const feedback = await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CSRF-Token': csrfToken,
    },
    body: JSON.stringify({ ...formData, csrfToken }),
  });

  return await feedback.json();
};

export const knockTo = async (page, authToken) => {
  const response = await fetch(`${baseURL}/${page}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'auth-token': authToken,
    },
  });

  return await response.json();
};

export const getToken = async () => {
  const data = await fetch(`${baseURL}/api/getcsrf`);
  const { csrfToken } = await data.json();
  return csrfToken;
};

// to use in the future 😀
export const deleteUser = async (id) => {
  return await fetch(`${baseURL}/deleteuser/${id}`)
    .then((data) => data.json())
    .then((data) => console.log(data));
};
