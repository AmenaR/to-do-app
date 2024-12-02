from flask import Blueprint, jsonify, request, abort
from pydantic import ValidationError
from app.models.todo import ToDo, ToDoRequest
from app.services.ToDoService import ToDoService, get_todo_service

"""
This blueprint contains CRUD endpoints for To Do items.
"""

bp = Blueprint('todo', __name__)

@bp.route('/todo', methods=["POST"])
def create_todo():
    try:
        data = request.get_json()
        todo_request = ToDoRequest(**data)

        todo_client = get_todo_service()
        todo = todo_client.create_todo(todo_request)
        return jsonify(todo.dict()), 201

    except ValidationError as e:
        abort(400, f'Bad Request: {str(e)}')
    except Exception as e:
        abort(500, f'Internal Server Error')
   

@bp.route('/todos', methods=["GET"])
def get_all_todos_endpoint():
    """
    Retrieves all to-do items.
    """
    try:
        todo_client = get_todo_service()
        todos = todo_client.get_all_todos()
        return jsonify([todo.dict() for todo in todos]), 200
    except Exception as e:
        abort(500, f'Internal Server Error')
   
@bp.route('/todo/<string:id>', methods=["GET"])
def get_todo_by_id_endpoint(id):
    """
    Retrieves a to-do item by ID.
    """
    try:
        todo_client = get_todo_service()
        todo = todo_client.get_todo_by_id(id)
        if not todo:
            return jsonify({"error": "ToDo not found", "id": id}), 404
        return jsonify(todo.dict()), 200
    except Exception as e:
        abort(500, f'Internal Server Error')

@bp.route('/todo/<string:id>', methods=["DELETE"])
def delete_todo_by_id_endpoint(id):
    """
    Deletes a to-do item by ID.
    """
    try:
        todo_client = get_todo_service()
        success = todo_client.delete_todo_by_id(id)
        if not success:
            return jsonify({"error": "ToDo not found", "id": id}), 404
        return '', 204
    except Exception as e:
        abort(500, f'Internal Server Error')

