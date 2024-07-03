import axios from 'axios';
import { mapResponseToTask, mapResponseToCategory } from '../services/mapping';
import { Task, Category, DecodedToken } from '../types';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access')}`,
  },
});

// Handle user requests
export const getUser = async (id:number) => {
  const response = await api.get(`/users/?id=${id}`);
  return response.data;
}

export const getUserID = async (token:string) => {
  const decodedToken = decodeToken(token)
  return decodedToken.user_id  
};

// Helper function to decode JWT token
const decodeToken = (token: string): DecodedToken => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const decodedToken: DecodedToken = JSON.parse(window.atob(base64))
    return decodedToken
};

// Handle task requests

export const addTask = async (title:string, description:string, category:number) => {
  api.post(
    '/todos/',
    {"title":title,
      "description":description,
      "category":category
    });
};

export const updateTask = (id:number, field:string, value:string|number) => {
  api.patch(`/todos/${id}/`,{[field]:value});
}

export const fetchTasks = async ():Promise<Task[]> => {
  const response = await api.get('/todos/');
  return  response.data.map(mapResponseToTask);
};

// Handle category requests

export const fetchCategories = async ():Promise<Category[]>  => {
  const response = await api.get('/categories/');
  return response.data.map(mapResponseToCategory);
};

export const addCategory = async (name:string) => {
  api.post('/categories/', {"name":name});
};

export default api;
