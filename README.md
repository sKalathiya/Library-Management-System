# Library Management App

This is a full-stack library management application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The backend REST API is ready, and the frontend will be developed using React.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Backend Endpoints](#backend-endpoints)
  - [Authentication](#authentication)
  - [Book Management](#book-management)
  - [Lending Management](#lending-management)
  - [User Management](#user-management)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization
- Book management (add, update, delete, view books)
- Lending management (add, update, view lending deals)
- User profile management
- Filtering and searching capabilities

## Installation

### Backend Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/library-management-system.git
    ```
2. Navigate to the backend directory:
    ```sh
    cd library-management-system/Server_API
    ```
3. Install backend dependencies:
    ```sh
    npm install
    ```
5. Start the backend server:
    ```sh
    npm start
    ```

## Backend Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login a user
- `GET /logout` - Logout a user (requires authentication)
- `POST /updatePassword/:id` - Update user password (requires authentication and ownership)

### Book Management
- `GET /book` - Get all books
- `GET /book/filter` - Get books by filter
- `GET /book/:id` - Get book by ID
- `POST /book/add` - Add a new book (requires authentication and bookkeeper role)
- `DELETE /book/:id` - Delete a book by ID (requires authentication and bookkeeper role)
- `POST /book/update/:id` - Update a book by ID (requires authentication and bookkeeper role)

### Lending Management
- `POST /lending` - Add a new lending deal (requires authentication and bookkeeper role)
- `GET /lending/:id` - Get lending deal by ID (requires authentication)
- `GET /lending` - Get all lending deals (requires authentication and bookkeeper role)
- `GET /lending/filter` - Get lending deals by filter (requires authentication)
- `POST /lending/status/:id` - Change status of a lending deal (requires authentication and bookkeeper role)

### User Management
- `GET /user` - Get all users (requires authentication and bookkeeper role)
- `GET /user/filter` - Get users by filter (requires authentication and bookkeeper role)
- `GET /user/:id` - Get user by ID (requires authentication and bookkeeper role)
- `GET /myProfile/:id` - Get own profile by ID (requires authentication and ownership)
- `DELETE /myProfile/:id` - Delete own profile (requires authentication and ownership)
- `POST /myProfile/update/:id` - Update own profile (requires authentication and ownership)

## Usage
- Register a new account or login with an existing account.
- Manage books by adding, updating, or deleting book records.
- View and manage lending deals.
- Update user profiles and change passwords.


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
