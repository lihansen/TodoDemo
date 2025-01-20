# TodoDemo

A full-stack Todo Application built with React.js and Node.js, featuring user authentication and CRUD operations for tasks.

## Features

- 📝 Create, read, update, and delete tasks
- ✅ Mark tasks as completed/uncompleted
- 🔒 User authentication with cookie and JWT
- 💾 Data persistence using MongoDB Altas
- 📱 Responsive design
- 🎨 Clean and intuitive UI with Material UI

## Tech Stack

- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Demo Users

Use these credentials for testing:

```
Username: admin
Password: admin123

Username: john
Password: john123

Username: jane
Password: jane123
```
## Installation & Setup

### Frontend Setup

```bash
cd frontend
npm install
npm start
```
The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
node main.js
```
The backend will run on `http://localhost:3000`

## Environment Variables

The `.env` file is already included in the backend directory for testing purposes.



## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Authentication
- `POST /users/login` - Login user
- `POST /users/logout` - Logout user
- `GET /users/isloggedin` - Check if user is logged in

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
