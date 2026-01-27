const API_URL = 'http://localhost:3005/taches';

export const getTasks = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};

export const getTaskById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

