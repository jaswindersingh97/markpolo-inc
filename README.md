📝 Overview

This project is a full-stack application featuring a Node.js backend API and a React frontend that displays paginated user data with infinite scroll virtualization. The solution efficiently handles large datasets while maintaining optimal performance.

[🚀 Launch App Frontend](https://markpolo-inc.vercel.app/)
[🚀 Launch App Backend](https://markpolo-inc.onrender.com/api/users)

🌟 Features

Backend API:

Paginated user data endpoint

JSON file-based data source

Error handling for invalid queries

Frontend:

Virtualized table with infinite scroll

Phone number international formatting

Combined company/city display

Search functionality with debouncing

Loading indicators

Responsive design with TailwindCSS

🚀 Installation & Setup
Backend Setup
Navigate to the backend directory:

bash
cd backend
Install dependencies:

bash
npm install
Start the server:

add .env file
touch .env
in .env add PORT = 3000

bash
npm start
The backend will run on http://localhost:3000

Frontend Setup
Navigate to the frontend directory:

bash
cd client
Install dependencies:

bash
npm install
Start the development server:

add .env
touch .env
IN .env add VITE_API_URL=http://localhost:3000

bash
npm start
The frontend will run on http://localhost:5173


🔧 Technical Implementation
Backend Highlights
Simple Express server serving paginated data

Reads from a JSON file containing ~5000 users

Endpoint: GET /api/users?page=1&limit=50

Handles invalid page/limit parameters gracefully

Frontend Highlights
Custom Hook: usePaginatedUsers manages data fetching, pagination, and state

Virtualization: Uses @tanstack/react-virtual for efficient rendering

Table: Implemented with @tanstack/react-table for flexible column definitions

Performance Optimizations:

Memoization with React.memo, useMemo, and useCallback

Virtualized rows for large datasets

UI Enhancements:

Loading indicators

Search functionality with debounced input

Responsive design with TailwindCSS

🎨 UI Components
UserTable: Main virtualized table component

SearchBar: Handles user search with debouncing

LoadingIndicator: Visual feedback during data fetching

📱 Responsive Design
The application is fully responsive and works on both mobile and desktop devices, with:

Adaptive table layouts

Mobile-friendly touch scrolling

Responsive spacing and typography

🏆 Bonus Features Implemented
Search functionality with manual debouncing

Loading indicators during API calls

Phone number international formatting

Combined company/city display

Error handling and empty states

