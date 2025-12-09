# TaskFlow — Full-Stack Task Manager

A modern, feature-rich task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). TaskFlow combines a responsive React frontend with a robust REST API backend, featuring JWT authentication, advanced analytics, dark mode, and comprehensive task management capabilities.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-2.0-blue)

## ✨ Key Features

### 🎯 Core Functionality
- **Complete Task Management** - Create, read, update, delete, archive, and duplicate tasks
- **Smart Filtering & Search** - Advanced filter dropdown with status, priority, date range, and sorting options
- **Task Tags & Labels** - Organize tasks with custom tags for better categorization
- **Due Date Tracking** - Set and monitor task deadlines with visual indicators
- **Priority Levels** - Low, Medium, High priority assignment

### 💬 Collaboration
- **Task Comments System** - Full CRUD operations for task-specific comments
- **Real-time Discussions** - Add notes, updates, and collaborate on tasks
- **Comment Editing & Deletion** - Edit or remove comments with visual indicators for edited content

### 📊 Analytics & Insights
- **Advanced Analytics Dashboard** - Visualize productivity metrics and trends
- **Completion Trend Tracking** - 30-day completion history with charts
- **Priority Distribution** - Visual breakdown of tasks by priority
- **Productivity Scoring** - Automated productivity score calculation
- **Overdue Task Alerts** - Quick identification of overdue items

### 🎨 User Experience
- **Dark Mode Toggle** - Full theme switching with system preference detection
- **Persistent Theme** - Theme preference saved in localStorage
- **Modern UI/UX** - Gradient designs, glassmorphism effects, smooth animations
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Toast Notifications** - Real-time feedback for all user actions

### 📁 Data Management
- **Export to CSV** - Download tasks in spreadsheet format
- **Export to JSON** - Full data export with metadata
- **Import from JSON** - Bulk import tasks from JSON files
- **Data Persistence** - Automatic saving with MongoDB

### 🔒 Security & Authentication
- **JWT-based authentication** with secure route protection
- **Password hashing** with bcryptjs
- **Protected API routes** with middleware
- **Role-based access control**
- **Token expiration** (7-day validity)

### 🚀 Technical Features
- **RESTful API** with Express.js
- **MongoDB Atlas** integration with compound indexes
- **React Context API** for state management
- **Optimized queries** with MongoDB aggregation pipelines
- **Input validation** with express-validator
- **Global error handling** middleware
- **CORS enabled** for cross-origin requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MERN
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The server will start on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The React app will start on `http://localhost:3000`

## 📁 Project Structure

```
TaskFlow/
├── backend/
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   ├── advancedTaskController.js
│   │   ├── commentController.js
│   │   ├── exportController.js
│   │   └── userController.js
│   ├── middleware/         # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/            # Mongoose schemas
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── Comment.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── exportRoutes.js
│   │   └── userRoutes.js
│   ├── utils/             # Helper functions
│   │   └── tokenUtils.js
│   ├── server.js          # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   │   ├── Navbar.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskModal.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   ├── FilterBar.jsx
    │   │   ├── ThemeToggle.jsx
    │   │   ├── CommentSection.jsx
    │   │   └── ExportImport.jsx
    │   ├── context/       # Context providers
    │   │   ├── AuthContext.jsx
    │   │   ├── TaskContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── pages/         # Page components
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Analytics.jsx
    │   │   └── Profile.jsx
    │   ├── utils/         # Utility functions
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `PUT /api/auth/password` - Update password (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `GET /api/tasks/stats` - Get task statistics (protected)
- `GET /api/tasks/analytics` - Get advanced analytics (protected)
- `PUT /api/tasks/bulk` - Bulk update tasks (protected)
- `PUT /api/tasks/:id/archive` - Archive/unarchive task (protected)
- `POST /api/tasks/:id/duplicate` - Duplicate task (protected)

### Comments
- `GET /api/comments/task/:taskId` - Get task comments (protected)
- `POST /api/comments/task/:taskId` - Add comment (protected)
- `PUT /api/comments/:commentId` - Update comment (protected)
- `DELETE /api/comments/:commentId` - Delete comment (protected)

### Export/Import
- `GET /api/export/csv` - Export tasks to CSV (protected)
- `GET /api/export/json` - Export tasks to JSON (protected)
- `POST /api/export/import` - Import tasks from JSON (protected)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🔑 Key Technologies

### Backend
- **Express.js 4.18.2** - Web framework
- **MongoDB & Mongoose 8.0.3** - Database and ODM with aggregation pipelines
- **JWT 9.0.2** - Authentication with 7-day token expiration
- **bcryptjs 2.4.3** - Password hashing
- **express-validator 7.0.1** - Input validation
- **cors 2.8.5** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React 18.2.0** - UI library with hooks
- **React Router 6.20.1** - Client-side routing
- **Axios 1.6.2** - HTTP client
- **React Toastify 9.1.3** - Toast notifications
- **React Icons 4.12.0** - Icon library
- **Vite 5.4.21** - Build tool and dev server

## 📊 MongoDB Schema Optimization

### User Schema
- Indexed on `email` and `createdAt`
- Password hashing pre-save middleware
- Virtual populate for tasks
- Email uniqueness validation

### Task Schema
- Compound indexes: `user + createdAt`, `user + status`, `user + priority`, `user + dueDate`
- Tags array for categorization
- Archive support with `isArchived` field
- Automatic `completedAt` timestamp on completion
- Static method `getUserStats()` for analytics

### Comment Schema
- Indexed on `task` and `createdAt`
- Reference to User and Task models
- Edit tracking with `isEdited` field
- Timestamp tracking for creation and updates

## 🔒 Security Features

- JWT token-based authentication with 7-day expiration
- Password hashing with bcrypt (10 salt rounds)
- Protected API routes with middleware
- Role-based access control (user/admin)
- Input validation and sanitization
- CORS configuration for secure cross-origin requests
- Token expiration handling
- User-specific data isolation

## 🎨 UI/UX Features

### Design
- Modern gradient color schemes
- Glassmorphism effects on cards
- Smooth animations and transitions
- Responsive design for all devices (desktop, tablet, mobile)
- CSS custom properties for theming
- Beautiful hover effects and micro-interactions

### Functionality
- **Advanced Filtering** - Dropdown with status, priority, date range, sort options
- **Search** - Real-time search across task titles and descriptions
- **Dark Mode** - Toggle between light and dark themes with persistence
- **Task Statistics** - Visual cards with counts and progress indicators
- **Toast Notifications** - Real-time feedback for all actions
- **Loading States** - Spinners and skeleton screens
- **Error Handling** - User-friendly error messages
- **Modal Forms** - Clean task creation and editing interface
- **Comment Panel** - Sliding panel for task discussions
- **Export Options** - Easy data export in multiple formats

## 📸 Screenshots

### Dashboard
- Task overview with statistics
- Filter and search capabilities
- Task cards with priority indicators

### Analytics
- Productivity score visualization
- 30-day completion trend chart
- Priority distribution graphs
- Overdue task alerts

### Dark Mode
- Full theme support across all pages
- Automatic system preference detection
- Smooth theme transitions

## 📝 Environment Variables

### Backend
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRE` - Token expiration time
- `PORT` - Server port
- `NODE_ENV` - Environment mode
- `CLIENT_URL` - Frontend URL for CORS

### Frontend
- `VITE_API_URL` - Backend API URL

## 🚢 Deployment

### Backend Deployment (Example: Render/Railway)
1. Create new web service
2. Connect your repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Example: Vercel/Netlify)
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Deploy

## 🎯 Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] Task attachments and file uploads
- [ ] Recurring tasks and reminders
- [ ] Team collaboration features
- [ ] Calendar view integration
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Task dependencies and subtasks
- [ ] Time tracking functionality
- [ ] Custom task templates

## 🐛 Known Issues

None at the moment. Please report any bugs in the Issues section.

## 📚 Learning Resources

This project demonstrates:
- Full-stack MERN architecture
- RESTful API design
- JWT authentication implementation
- MongoDB aggregation pipelines
- React Context API for state management
- React Hooks (useState, useEffect, useContext, custom hooks)
- Protected routes in React
- CRUD operations
- File export/import functionality
- Theme management and persistence

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**TaskFlow** - A comprehensive task management solution built with modern web technologies.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- React community for excellent documentation
- Express.js for the robust backend framework
- All contributors and supporters

---

**Note**: Make sure to change the JWT_SECRET in production and never commit your `.env` files to version control.

**Version 2.0** - Enhanced with advanced analytics, dark mode, comments system, and export/import functionality.
