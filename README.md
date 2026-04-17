# Task List App
A simple task list app that allows users to add, delete, and mark tasks as complete.

## Description
The Task List App is a dynamic web application built using vanilla JavaScript, with a dark UI theme and a clean, minimalistic design. The app uses localStorage to store tasks, allowing users to access their tasks even when offline.

## Features
* Add new tasks
* Delete existing tasks
* Mark tasks as complete
* Tasks are stored in localStorage
* Dark UI theme with a clean, minimalistic design

## Tech Stack
* Frontend: Vanilla JavaScript
* Storage: localStorage
* Backend: Supabase (for future development)

## Setup Instructions
1. Clone the repository: `git clone https://github.com/your-username/task-list-app.git`
2. Install dependencies: `npm install`
3. Start the app: `npm start`
4. Open the app in your browser: `http://localhost:3000`

## Usage Guide
1. Open the app in your browser
2. Click the "Add Task" button to add a new task
3. Enter the task text and click the "Add" button
4. Click the "Delete" button to delete a task
5. Click the "Complete" button to mark a task as complete

## API Endpoints
### Add Task
* Method: POST
* Path: /api/add-task
* Request Body: { taskText: string }
* Response Format: JSON
* Example Curl Command: `curl -X POST -H "Content-Type: application/json" -d '{"taskText": "New task"}' http://localhost:3000/api/add-task`

### Delete Task
* Method: POST
* Path: /api/delete-task
* Request Body: { taskId: number }
* Response Format: JSON
* Example Curl Command: `curl -X POST -H "Content-Type: application/json" -d '{"taskId": 1}' http://localhost:3000/api/delete-task`

### Update Task
* Method: POST
* Path: /api/update-task
* Request Body: { taskId: number, taskText: string }
* Response Format: JSON
* Example Curl Command: `curl -X POST -H "Content-Type: application/json" -d '{"taskId": 1, "taskText": "Updated task"}' http://localhost:3000/api/update-task`

## Folder Structure Overview
* `db`: Database schema and seed data
* `functions`: API endpoint functions
* `public`: Static assets and index.html
* `src`: Frontend code
* `tests`: Unit tests and integration tests

## Deployment Notes
* The app can be deployed to any hosting platform that supports static sites
* The API endpoints can be deployed to a serverless platform like Vercel or Netlify