# Pin Planet

Pin Planet is a full-stack web application that helps users save and organize places they have visited or want to visit.

Users can pin locations on a map, manage travel memories, and keep track of future destinations in one clean and interactive interface.

## Features

- Save and manage locations
- Mark places as visited or want to visit
- Interactive map interface
- Notes and place details
- Responsive UI
- Client-side routing
- User authentication (signup/login/logout)
- Secure session management with cookies
- Protected routes and credential-based access
- Persistent data storage with MongoDB

## Tech Stack

### Frontend

- React
- React Router DOM
- Context API
- JavaScript
- CSS Modules

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Authentication & Authorization
- Cookies for session handling

## Backend Features

- RESTful API for managing pins and users
- MongoDB database integration using Mongoose
- User authentication with secure credentials
- Cookie-based authentication/session management
- Error handling and middleware support

## Getting Started

### Install Dependencies

```bash
npm install
```

````

### Run Frontend

```bash
npm run dev
```

### Run Backend

```bash
npm start
```

## Environment Variables

Create a `.env` file in frontend & backend directories and configure:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

## Future Improvements

- Image upload for places
- Location search with geocoding
- Social sharing
- Travel analytics dashboard
````
