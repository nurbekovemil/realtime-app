# Realtime App

A real-time web application built with modern frontend and backend technologies.

## Tech Stack
- **Frontend**: React, TypeScript, Redux Toolkit, RTK Query, Socket.IO-client
- **Backend**: NestJS, Socket.IO
- **Database**: PostgreSQL

## Features
- Real-time updates using websockets
- State management with Redux Toolkit and RTK Query
- Fully typed codebase with TypeScript
- Backend API built with NestJS
- PostgreSQL database integration

## Installation and Setup

### Prerequisites
- Node.js
- PostgreSQL

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/nurbekovemil/realtime-app.git
   cd realtime-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and configure it:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_database
   ```
4. Start the application:
   ```bash
   npm run start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Future Enhancements
- Add user authentication
- Expand testing coverage (unit and integration tests)
- Optimize performance for production deployment

## Author
- **Emil Nurbekov** - [GitHub Profile](https://github.com/nurbekovemil)
