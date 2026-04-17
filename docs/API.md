# API Documentation
## Introduction
The Task List App API provides endpoints for adding, deleting, and updating tasks.

## Endpoints
### Add Task
#### Method
POST
#### Path
/api/add-task
#### Request Body
{ taskText: string }
#### Response Format
JSON
#### Example Response
```json
{
  "message": "Task added successfully"
}
```
#### Example Curl Command
```bash
curl -X POST -H "Content-Type: application/json" -d '{"taskText": "New task"}' http://localhost:3000/api/add-task
```

### Delete Task
#### Method
POST
#### Path
/api/delete-task
#### Request Body
{ taskId: number }
#### Response Format
JSON
#### Example Response
```json
{
  "message": "Task deleted successfully"
}
```
#### Example Curl Command
```bash
curl -X POST -H "Content-Type: application/json" -d '{"taskId": 1}' http://localhost:3000/api/delete-task
```

### Update Task
#### Method
POST
#### Path
/api/update-task
#### Request Body
{ taskId: number, taskText: string }
#### Response Format
JSON
#### Example Response
```json
{
  "message": "Task updated successfully"
}
```
#### Example Curl Command
```bash
curl -X POST -H "Content-Type: application/json" -d '{"taskId": 1, "taskText": "Updated task"}' http://localhost:3000/api/update-task
```