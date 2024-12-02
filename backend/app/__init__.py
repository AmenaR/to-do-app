import os

from flask import Flask
from flask_cors import CORS
from app.services.ToDoService import ToDoService
from app.blueprints import todo


def create_app():
    # create and configure the app
    app = Flask(__name__)

    if int(os.getenv("FLASK_DEBUG")) == 1:
        CORS(app)

    todo_service = ToDoService()
    todo_service.init_app(app)

    # register blueprints
    app.register_blueprint(todo.bp)

    # TEST: a simple page that says hello
    @app.route('/test')
    def hello():
        return 'Hello, World!'
   
    return app

