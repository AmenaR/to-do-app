import uuid
from flask import current_app
from typing import List, Optional
from app.models.todo import ToDo, ToDoRequest

"""
Service class to manage ToDo CRUD operations.
"""
class ToDoService:
    def __init__(self):
        # In-memory storage for simplicity
        self.todos = {}
    
    def init_app(self, app):
        app.todo_service = self

    def create_todo(self, todo_request: ToDoRequest) -> ToDo:
        todo_request.sanitize()
        
        todo = ToDo(
            id=str(uuid.uuid4()),
            title=todo_request.title,
            description=todo_request.description
        )

        self.todos[todo.id] = todo
        return todo

    def get_all_todos(self) -> List[ToDo]:
        return list(self.todos.values())

    def get_todo_by_id(self, todo_id: str) -> Optional[ToDo]:
        return self.todos.get(todo_id)

    def delete_todo_by_id(self, todo_id: str) -> bool:
        return self.todos.pop(todo_id, None) is not None


def get_todo_service() -> ToDoService:
    return current_app.todo_service