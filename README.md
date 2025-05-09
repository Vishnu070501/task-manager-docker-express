# Task Manager Application

A full-stack task management application built with Express.js, MongoDB, and Docker.

## Architecture

This project uses a multi-container Docker architecture:
- **Express.js API container**: Handles HTTP requests, business logic, and database interactions
- **MongoDB container**: Stores task data persistently

![Architecture Diagram](docs/architecture.png)

## Features

- Create, read, update, and delete tasks
- User authentication and authorization
- Task filtering and sorting
- Responsive UI for mobile and desktop

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose
- **API**: RESTful API design

## Local Development Setup

### Prerequisites

- Docker and Docker Compose installed on your machine
- Git

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-manager-docker-express.git
   cd task-manager-docker-express
   ```

2. Start the application:
   ```
   docker-compose up -d
   ```

3. Access the application:
   - API: http://localhost:3000/api
   - Frontend: http://localhost:3000

### Stopping the Application

```
docker-compose down
```

To remove volumes (database data):
```
docker-compose down -v
```

## API Documentation

### Tasks Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/tasks | Get all tasks |
| GET    | /api/tasks/:id | Get a specific task |
| POST   | /api/tasks | Create a new task |
| PUT    | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

For detailed API documentation, see [API.md](docs/API.md).

## Container Management

View running containers:
```
docker ps
```

View logs:
```
docker-compose logs -f app    # Express app logs
docker-compose logs -f mongodb # MongoDB logs
```

## Project Structure

```
task-manager-docker-express/
├── Dockerfile              # Express app container configuration
├── docker-compose.yml      # Multi-container orchestration
├── package.json            # Node.js dependencies
├── src/                    # Application source code
│   ├── controllers/        # Request handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── app.js              # Express application setup
├── docs/                   # Documentation files
│   ├── architecture.png    # Architecture diagram
│   └── API.md              # Detailed API documentation
└── README.md               # Project documentation
```

## Potential Cloud Deployment

While this project is designed for local demonstration, it's architected to be cloud-ready:

- The multi-container setup could be deployed to:
  - AWS ECS (Elastic Container Service)
  - AWS EC2 with Docker Compose
  - Kubernetes cluster

## Screenshots

![Task List](docs/screenshot-tasks.png)
![Add Task](docs/screenshot-add-task.png)

## License

MIT
```

## Step 3: Create an architecture diagram

Create a simple architecture diagram using draw.io or a similar tool and save it as `docs/architecture.png`. The diagram should show:
- Express container
- MongoDB container
- Network connections between them
- API endpoints

## Step 4: Create API documentation

```markdown:docs/API.md
# Task Manager API Documentation

## Authentication

### POST /api/auth/register
Register a new user

**Request Body:**
```json
{
  "username": "user1",
  "email": "user1@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": "60d21b4667d0d8992e610c85",
  "username": "user1",
  "email": "user1@example.com",
  "token": "jwt-token-here"
}
```

### POST /api/auth/login
Login an existing user

**Request Body:**
```json
{
  "email": "user1@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": "60d21b4667d0d8992e610c85",
  "username": "user1",
  "email": "user1@example.com",
  "token": "jwt-token-here"
}
```

## Tasks

### GET /api/tasks
Get all tasks for the authenticated user

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
[
  {
    "id": "60d21b4667d0d8992e610c86",
    "title": "Complete project",
    "description": "Finish the task manager project",
    "status": "in-progress",
    "dueDate": "2023-12-31T00:00:00.000Z",
    "createdAt": "2023-11-15T10:30:00.000Z",
    "updatedAt": "2023-11-15T10:30:00.000Z"
  },
  {
    "id": "60d21b4667d0d8992e610c87",
    "title": "Learn Docker",
    "description": "Study Docker and container orchestration",
    "status": "completed",
    "dueDate": "2023-11-20T00:00:00.000Z",
    "createdAt": "2023-11-10T08:15:00.000Z",
    "updatedAt": "2023-11-15T14:20:00.000Z"
  }
]
```

### GET /api/tasks/:id
Get a specific task by ID

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "id": "60d21b4667d0d8992e610c86",
  "title": "Complete project",
  "description": "Finish the task manager project",
  "status": "in-progress",
  "dueDate": "2023-12-31T00:00:00.000Z",
  "createdAt": "2023-11-15T10:30:00.000Z",
  "updatedAt": "2023-11-15T10:30:00.000Z"
}
```

### POST /api/tasks
Create a new task

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Request Body:**
```json
{
  "title": "Learn MongoDB",
  "description": "Study MongoDB database concepts",
  "status": "not-started",
  "dueDate": "2023-12-15T00:00:00.000Z"
}
```

**Response:**
```json
{
  "id": "60d21b4667d0d8992e610c88",
  "title": "Learn MongoDB",
  "description": "Study MongoDB database concepts",
  "status": "not-started",
  "dueDate": "2023-12-15T00:00:00.000Z",
  "createdAt": "2023-11-16T09:45:00.000Z",
  "updatedAt": "2023-11-16T09:45:00.000Z"
}
```

### PUT /api/tasks/:id
Update an existing task

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Request Body:**
```json
{
  "status": "completed"
}
```

**Response:**
```json
{
  "id": "60d21b4667d0d8992e610c88",
  "title": "Learn MongoDB",
  "description": "Study MongoDB database concepts",
  "status": "completed",
  "dueDate": "2023-12-15T00:00:00.000Z",
  "createdAt": "2023-11-16T09:45:00.000Z",
  "updatedAt": "2023-11-16T10:30:00.000Z"
}
```

### DELETE /api/tasks/:id
Delete a task

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```
204 No Content
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 404 Not Found
```json
{
  "error": "Task not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error"
}
```
```

## Step 5: Create a .gitignore file

```:.gitignore
# Node.js
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Docker
.dockerignore

# Logs
logs/
*.log

# Build files
dist/
build/
out/

# Editor directories and files
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
```
