import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getDepartments = () => API.get('/departments');
export const createUser = (data) => API.post('/users', data);
export const getUsers = () => API.get('/users');
export const updateUser = (data, id) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
