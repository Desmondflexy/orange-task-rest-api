# TASKS MANAGER

This is a CRUD (Create, Read, Update, Delete) REST API project.

## Project Setup

### Clone repository
```
git clone https://github.com/Desmondflexy/orange-task-rest-api.git
```

### Install dependencies
```
yarn
```

### Compile
```
yarn compile
```

### Start server
```
yarn start
```

## Endpoints

### Base URL
`http://localhost:3000`

### Create task
`POST /tasks/`

#### Request body
```
{
    "title": "new task",
    "description": new task description"
}
```

### Get all tasks
`GET /tasks/`

### Get a task
`GET /tasks/{taskId}`

### Update a task
`PUT /tasks/{taskId}`

### Delete a task
`DELETE /tasks/{taskId}`
