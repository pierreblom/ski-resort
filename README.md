# Ski Trip Manager

A web application to help organizers efficiently manage ski trail assignments.

## Features

- Input group size
- Select trail difficulty
- View detailed trail overview
- Filter trails based on difficulty, groomed status, and lift elevation gain
- Automatically match trails to group size and difficulty

## Tech Stack

- Frontend: React with TypeScript
- Backend: FastAPI (Python)
- API: GraphQL (snowtooth.moonhighway.com)

## Setup and Running Locally

### Frontend

1. Navigate to the frontend directory:
   ```
   cd ski-trip-manager-frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Ensure the .env file is correctly set up with any required environment variables. Modify the values as necessary for your local environment.

6. Run the FastAPI server:
   ```
   uvicorn app.main:app --reload
   ```
