import React, { useState } from 'react';
import { ToDoRequest } from '../services/models';

interface ToDoFormProps {
  onCreate: (newTodo: ToDoRequest) => void;
}

const ToDoForm = ({ onCreate }: ToDoFormProps ) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) return;
    const newTodo: ToDoRequest = { title, description };
    onCreate(newTodo); // Pass the new to-do back to parent component
    setTitle(''); 
    setDescription(''); 
  };

  return (
    <form onSubmit={handleSubmit} className="container my-4 p-4 bg-light rounded shadow">
      <h2 className="text-center mb-3">Create New Todo</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          placeholder="Enter title"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          placeholder="Enter description"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Add Todo</button>
    </form>
  );
};

export default ToDoForm;
