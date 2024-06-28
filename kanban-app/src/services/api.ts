import axios from 'axios';
import { mapResponseToTask, mapResponseToCategory } from '../services/mapping';
import { Task, Category } from '../types';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access')}`,
  },
});

export const updateTask = (id:number, field:string, value:string|number) => {
  api.patch(`/todos/${id}/`,{[field]:value});
}

export const fetchTasks = async ():Promise<Task[]> => {
  const response = await api.get('/todos/');
  return  response.data.map(mapResponseToTask);
};

export const fetchCategories = async ():Promise<Category[]>  => {
  const response = await api.get('/categories/');
  return response.data.map(mapResponseToCategory);
};

export default api;
