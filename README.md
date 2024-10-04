# Basic User Management System

This project is a **Basic User Management System** that includes a user settings page with role-based access control. The system supports user login via **Google** identity, provides administrative functionalities to manage users, and handles permission management. The project also includes a **REST API** implementation using the Express.js, and uses **ReactJS** with **MUI** (Material UI) for the frontend and **PostgreSQL** for the backend.

## Features

### 1. Authentication
- **Google Login**: OAuth authentication using Google and Microsoft providers.
  - Implemented with `react-oauth/google` for ReactJS.
  
### 2. User Roles and Permissions
- **Basic Users**: 
  - Can view and update their profile and account settings.
  
- **Admin Users**: 
  - Add new users.
  - Delete existing users.
  - Assign user roles (Admin or Regular).
  - Grant additional permissions.
  - Create new permission types.

### 3. Frontend (ReactJS + MUI)
- The user interface is built using **ReactJS** and **MUI** for a clean and responsive design.
- A **settings page** allows basic users to manage their own accounts and admins to manage other users.

### 4. Backend (PostgreSQL)
- The backend stores user data, roles, and permissions in **PostgreSQL**.
- Includes models for users, roles, and permissions for role-based authorization.

## Key Technologies
- **Frontend**: 
  - ReactJS
  - MUI (Material UI)
  - OAuth (Google)
  
- **Backend**: 
  - PostgreSQL

## Setup Instructions

### Prerequisites
- **Node.js** and **npm**: To run the frontend (React).
- **PostgreSQL**: For the backend database.

### Steps to Run
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/basic-user-management.git
   cd basic-user-management
2. **Run the project**;
   ```command
   cd server
   npm run server
   
   cd client
   npm start
3. **Install the database**
   
