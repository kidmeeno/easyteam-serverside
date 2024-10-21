# EasyTeam Backend API

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes](#authentication-routes)
  - [Settings Routes](#settings-routes)
  - [Location Routes](#location-routes)
- [Error Handling](#error-handling)
- [License](#license)

## Introduction
This is the backend API for EasyTeam, an employee time tracking solution. The API handles employee authentication (signup and login), managing EasyTeam settings, and saving/getting location data. It is built using Node.js and Express.js, and uses MongoDB for the database.

## Technologies Used
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - ODM for MongoDB
- **JWT (JSON Web Tokens)** - For authentication
- **bcrypt** - For hashing passwords

## Features
- Employee authentication (signup and login).
- Store and retrieve global EasyTeam settings.
- Save and retrieve location data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kidmeeno/easyteam-serverside.git
   cd easyteam-serverside
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory and add the following:

   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will start on `http://localhost:8000`.

## Environment Variables

| Variable       | Description                        |
| -------------- | ---------------------------------- |
| `PORT`         | The port number on which the server listens (default: 8000). |
| `MONGO_URI`    | MongoDB connection string. |

## API Endpoints

### Authentication Routes

1. **Employee Signup**
   - `POST /api/employees/create`
   - Registers a new employee.
   
   **Request Body:**
   ```json
   {
     "name": "John Doe",
     "email": "johndoe@example.com",
     "password": "password123"
   }
   ```

   **Response:**
   ```json
   {
     "message": "Employee registered successfully",
     "employee": {
       "_id": "60d7f58b5b9f5e0012345678",
       "name": "John Doe",
       "email": "johndoe@example.com"
     },
     "token": "your_jwt_token"
   }
   ```

2. **Employee Login**
   - `POST /api/employees/employee-login`
   - Logs in an employee and returns a JWT token.
   
   **Request Body:**
   ```json
   {
     "email": "johndoe@example.com",
     "password": "password123"
   }
   ```

   **Response:**
   ```json
   {
     "message": "Login successful",
     "employee": {
       "_id": "60d7f58b5b9f5e0012345678",
       "name": "John Doe",
       "email": "johndoe@example.com"
     },
     "token": "your_jwt_token"
   }
   ```

### Settings Routes

1. **Get EasyTeam Settings**
   - `GET /api/settings`
   - Retrieves the global EasyTeam settings.

   **Response:**
   ```json
   {
     "isGlobalTrackingEnabled": true,
   }
   ```

2. **Update EasyTeam Settings**
   - `PUT /api/settings`
   - Updates the global EasyTeam settings.
   
   **Request Body:**
   ```json
   {
     "isGlobalTrackingEnabled": true,
   }
   ```

   **Response:**
   ```json
   {
     "isGlobalTrackingEnabled": true,
   }
   ```

## Error Handling
- All error responses follow this format:
  ```json
  {
    "error": "Error message"
  }
  ```

- Example of an error response:
  ```json
  {
    "error": "Employee not found"
  }
  ```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.