export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const saveTodos = (userEmail, todos) => {
  localStorage.setItem(`todos-${userEmail}`, JSON.stringify(todos));
};

export const getTodos = (userEmail) => {
  const todos = localStorage.getItem(`todos-${userEmail}`);
  return todos ? JSON.parse(todos) : [];
};

