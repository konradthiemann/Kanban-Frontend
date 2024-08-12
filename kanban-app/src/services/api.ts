import axios from 'axios'
import { mapResponseToTask, mapResponseToCategory } from '../services/mapping'
import { Task, Category, DecodedToken, User } from '../types'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access')}`,
  },
})

// Handle user requests
export const getAllUsers = async ():Promise<User[]> => {
  const response = await api.get('/users/')
  return response.data
}

export const getUser = async (id:number):Promise<User> => {
  const response = await api.get(`/users/?id=${id}`)
  if (response.data.length === 0) {
    throw new Error('User not found')
  } 
  return response.data[0]
}

export const getUserID = async (token:string):Promise<number> => {
  const decodedToken = decodeToken(token)
  return decodedToken.user_id  
}

// Helper function to decode JWT token
const decodeToken = (token: string): DecodedToken => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const decodedToken: DecodedToken = JSON.parse(window.atob(base64))
    return decodedToken
};

// Handle task requests
export const addTask = async (title:string, description:string, category:number):Promise<void> => {
  api.post(
    '/todos/',
    {"title":title,
      "description":description,
      "category":category
    })
}

export const updateField = (id:number, field:string, value:string|number):void => {
  api.patch(`/todos/${id}/`,{[field]:value})
}

export const fetchTasks = async ():Promise<Task[]> => {
  const response = await api.get('/todos/')
  return  response.data.map(mapResponseToTask)
}

export const searchTasks = async (search:string):Promise<Task[]> => {
  const response = await api.get(`/tasks/search/?q=${search}`)
  return response.data.map(mapResponseToTask)
}

export const deleteTask = async (id:number):Promise<void> => {
  api.delete(`/todos/${id}/`)
}

export const updateTask = async (task:Task):Promise<void> => {
  api.patch(`/todos/${task.id}/`,task)
}

// Handle category requests
export const fetchCategories = async ():Promise<Category[]>  => {
  const response = await api.get('/categories/')
  return response.data.map(mapResponseToCategory)
}

export const addCategory = async (name:string):Promise<void> => {
  const response = api.post('/categories/', {"name":name})
  console.log(response)
}

export const deleteCategory = async (id:number):Promise<void> => {
  api.delete(`/categories/${id}/`)
}

export default api
