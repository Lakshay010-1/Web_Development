# [Assets Now v1](https://lakshaygoyal-lg-assets-now-v1.vercel.app/)

**Assets-Now** is a full-stack financial data platform that allows users to track market assets, analyze investment performance, and stay updated with the latest financial news.

## Features

- **Real-Time & Historical Asset Data**
  - Fetch current asset prices.
  - Retrieve historical price data within a custom date range.

- **Portfolio Management**
  - Add assets to a personal portfolio.
  - Monitor investment performance, including:
    - Profit and loss (P&L)
    - Returns and gains
    - Overall portfolio valuation

- **Watchlist**
  - Save assets to a watchlist for quick access and tracking.

- **Financial News**
  - Stay informed with the latest finance-related news and market updates.

- **Authentication & Security**
  - Secure user authentication using JWT and HTTP-only cookies.
  - Passwords are hashed with **bcrypt** before being stored.

- **Database Persistence**
  - User accounts, watchlists, and portfolio data are stored in **MongoDB** using **Mongoose**.

## Tech Stack

### Frontend

- React

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication & Security

- JWT (JSON Web Tokens)
- bcrypt
- Cookie-based authentication

## Installation

1. Clone the Repository
   ```
   git clone https://github.com/Lakshay010-1/Web_Development/tree/main/React/Assets_Now_v1
   ```
2. Install Dependencies

- Frontend
  ```
  cd frontend
  npm install
  ```
- Backend
  ```
  cd backend
  npm install
  ```

3. Configure Environment Variables

- Create .env files for both the frontend and backend and add the required environment variables.

4. Run the Application

- Start the frontend

  ```
  cd frontend
  npm run dev
  ```

- Start the backend
  ```
  cd backend
  npm start
  ```

<br>

## Project Overview

Assets-Now provides investors and market enthusiasts with a single platform to track assets, analyze historical performance, manage portfolios, and stay up to date with financial news. The platform is designed to offer useful investment insights while maintaining secure authentication and persistent user data.

<br>

## Future Improvements

- Introduce Redis for caching frequently requested market data and improving response times.
- Implement a Provider Abstraction Layer to support multiple financial data providers and simplify provider switching.
- Add advanced portfolio analytics and performance metrics.
- Price alerts and notifications for watchlist assets.
- Improve responsiveness and provide a Progressive Web App (PWA) experience.
- Increase test coverage with unit and integration tests.
- Add portfolio benchmarking against market indices.
