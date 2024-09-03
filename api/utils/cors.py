from fastapi.middleware.cors import CORSMiddleware
import os

# Use an environment variable to determine the frontend URL
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

def setup_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[FRONTEND_URL],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
