import { Task, Category } from '../types';

export const mapResponseToTask = (response: Task): Task => {
  return {
    id: response.id,
    assigned_to: response.assigned_to,
    author: response.author,
    status: response.status,
    due_date: response.due_date,
    urgency: response.urgency,
    title: response.title,
    description: response.description,
    category: response.category,
  }
}

export const mapResponseToCategory = (response: Category): Category => {
  return {
    id: response.id,
    name: response.name,
  }
}

export const dateToUnixTimestamp = (dateString: string): number => {
  if (!dateString) return 0
  const date = new Date(dateString)
  const timestamp = date.getTime()
  return timestamp
}