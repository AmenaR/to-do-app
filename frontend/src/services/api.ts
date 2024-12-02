import axios from 'axios';
import { ToDo, ToDoRequest } from './models'; // Import the types

// Fetch all ToDos
export const getAllTodos = async (): Promise<ToDo[]> => {
  const response = await axios.get('/api/todos');
  return response.data;
};

// Create a new ToDo
export const createTodo = async (todoRequest: ToDoRequest): Promise<ToDo> => {
  const response = await axios.post('/api/todo', todoRequest);
  return response.data;
};

// Delete a ToDo by ID
export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`/api/todo/${id}`);
};
