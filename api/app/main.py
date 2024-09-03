from fastapi import FastAPI
import os
from utils.cors import setup_cors
from routes import trails, root
import uvicorn

app = FastAPI()

# Setup CORS
setup_cors(app)

# Include routes
app.include_router(trails.router)
app.include_router(root.router)
