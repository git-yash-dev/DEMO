# Civic Issue Reporting Backend API

## Overview
A complete Node.js backend API for a Civic Issue Reporting App that allows citizens to report municipal issues and enables government staff to manage and track resolution progress.

## Features
- **User Authentication**: JWT-based auth with role-based access (citizen, staff, admin)
- **Issue Reporting**: Citizens can create reports with photos and GPS coordinates
- **Department Management**: Automatic assignment of reports to appropriate departments
- **Real-time Updates**: WebSocket integration for live status updates
- **Notifications**: System for notifying users about report status changes
- **Image Upload**: Multer-based file upload for report photos
- **API Documentation**: Swagger/OpenAPI documentation at `/docs`

## Tech Stack
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT with bcryptjs
- **File Upload**: Multer
- **Real-time**: Socket.io
- **Documentation**: Swagger UI

## Project Structure
```
src/
├── config/
│   ├── database.js       # Database connection
│   └── swagger.js        # API documentation config
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── reportController.js   # Report management
│   └── notificationController.js # Notifications
├── middleware/
│   ├── auth.js          # JWT authentication
│   ├── upload.js        # File upload handling
│   └── errorHandler.js  # Global error handling
├── models/
│   ├── User.js          # User model
│   ├── Report.js        # Issue report model
│   ├── Department.js    # Department model
│   ├── Assignment.js    # Report-department assignments
│   ├── Notification.js  # User notifications
│   └── index.js         # Model associations
├── routes/
│   ├── authRoutes.js    # Authentication endpoints
│   ├── reportRoutes.js  # Report management endpoints
│   └── notificationRoutes.js # Notification endpoints
├── seeders/
│   └── departmentSeeder.js # Department seed data
├── utils/
│   ├── jwt.js           # JWT utilities
│   └── departmentAssigner.js # Auto-assignment logic
└── server.js            # Main application entry point
```

## Environment Variables
Copy `.env.example` to `.env` and configure:
- Database connection (uses available DATABASE_URL)
- JWT secret
- Upload configuration

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Reports
- `POST /api/reports` - Create new report (with photo upload)
- `GET /api/reports` - List reports (with filtering)
- `GET /api/reports/:id` - Get specific report
- `PUT /api/reports/:id/status` - Update report status (staff/admin only)

### Notifications
- `POST /api/notifications` - Create notification (staff/admin)
- `GET /api/notifications/user/:userId` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read

## Database Schema

### Users
- id, name, email, password (hashed), role, timestamps

### Reports  
- id, userId, title, description, photoURL, location (JSON), issueType, status, priority, timestamps

### Departments
- id, name, description, timestamps

### Assignments
- id, reportId, departmentId, assignedAt, status, timestamps

### Notifications
- id, userId, message, read (boolean), timestamps

## Issue Types & Departments
- **Sanitation** → Sanitation Department
- **Public Works** → Public Works Department
- **Lighting** → Lighting Department
- **Traffic** → Traffic Management
- **Parks** → Parks and Recreation
- **Noise** → Noise Control
- **Other** → General Services

## Real-time Features
WebSocket events for:
- New report notifications
- Status update notifications
- User-specific messaging

## Running the Application
The server runs on port 5000 with auto-restart via nodemon. Database tables are automatically created and departments are seeded on startup.

## API Documentation
Swagger documentation available at: http://localhost:5000/docs
Health check available at: http://localhost:5000/health

## Recent Changes
- Complete backend scaffold implementation
- All CRUD operations for reports and users
- JWT authentication with role-based access
- Image upload functionality
- WebSocket integration
- API documentation
- Department auto-assignment
- Database seeding