from datetime import datetime
from pydantic import BaseModel

class HistoryItem(BaseModel):
    filename: str
    timestamp: datetime
    result: dict

    class Config:
        from_attributes = True 
