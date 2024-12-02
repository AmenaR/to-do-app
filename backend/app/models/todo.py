from typing import Optional
from pydantic import BaseModel

"""
Represents an individual to-do item.
"""
class ToDo(BaseModel):
    id: str
    title: str
    description: Optional[str]

    def sanitize(self):
        self.title = self.title.strip()
        self.description = self.description.strip()


class ToDoRequest(BaseModel):
    title: str
    description: Optional[str]

    def sanitize(self):
        self.title = self.title.strip()
        self.description = self.description.strip()