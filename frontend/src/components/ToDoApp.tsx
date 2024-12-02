import { useState, useEffect } from 'react';
import { getAllTodos, createTodo, deleteTodo } from '../services/api';
import { ToDoRequest, ToDo } from '../services/models';
import ToDoForm from './ToDoForm';

const ToDoApp = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [reloadTodos, setReloadTodos] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
      if(reloadTodos){
        fetchTodos();
        setReloadTodos(false);
      }
  }, [reloadTodos]);

    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getAllTodos(); 
        setTodos(fetchedTodos); 
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    const handleCreate = async (newTodo: ToDoRequest) => {
        try {
          await createTodo(newTodo); 
          setReloadTodos(true);
        } catch (error) {
          console.error("Error creating todo:", error);
        }
      };

      const handleDelete = async (id: string) => {
        try {
          await deleteTodo(id);
          setReloadTodos(true);
        } catch (error) {
          console.error("Error deleting todo:", error);
        }
      };

      return (
        <div>
          <h1>To-Do List</h1>
          
          {/* ToDoForm Component for adding new todos */}
          <ToDoForm onCreate={handleCreate} />
          
          {/* List of todos */}
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description || 'No description'}</td>
              <td>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      );
};

export default ToDoApp;
