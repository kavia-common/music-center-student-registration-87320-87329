# Music Center Student Registration Frontend

Modern "Ocean Professional" themed React frontend for registering students at the music center.

## Features

- Registration form with required validation (first name, last name, email, instrument)
- POST to backend: `POST /api/students`
- Optional admin-only table (append `?admin=1` to URL) that fetches students via `GET /api/students`
- Clean minimalist UI with blue & amber accents, subtle gradients and shadows

## Setup

1. Install dependencies:
   - `npm install`

2. Configure backend URL (optional if same-origin):
   - Copy `.env.example` to `.env`
   - Set `REACT_APP_BACKEND_URL` to your Flask backend, e.g.:
     ```
     REACT_APP_BACKEND_URL=http://localhost:5000
     ```

3. Run the app:
   - `npm start`
   - Open http://localhost:3000

4. View admin table (optional):
   - Open http://localhost:3000?admin=1

## API Contract

- POST /api/students
  - Body: `{ first_name, last_name, email, phone?, instrument, experience_years? }`
  - Returns: 2xx on success

- GET /api/students
  - Returns: `[{ id?, first_name, last_name, email, phone, instrument, experience_years? }, ...]` or `{ students: [...] }`

## Notes

- If your backend is on a different origin/port, ensure CORS is enabled for the frontend origin.
- Validation happens client-side; backend should also validate and return appropriate status codes.
