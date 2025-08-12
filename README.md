# FeedFlow - Infinite Scrolling Social Feed

A full-stack web application showcasing infinite scrolling functionality with React frontend and Spring Boot backend.

## Features

- ✅ Infinite scrolling with Intersection Observer API
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states and error handling
- ✅ Image lazy loading with fallbacks
- ✅ PostgreSQL database with sample data
- ✅ CORS configuration for cross-origin requests
- ✅ Smooth animations and hover effects

## Tech Stack

**Frontend:**

- React 19.1.1
- Axios for HTTP requests
- Tailwind CSS for styling
- Intersection Observer API for infinite scrolling

**Backend:**

- Spring Boot 3.3.2
- Spring Data JPA
- PostgreSQL database
- Maven for dependency management

## Prerequisites

- Node.js (v16 or higher)
- Java 21
- PostgreSQL
- Maven

## Setup Instructions

### Database Setup

1. Install PostgreSQL and pgAdmin
2. Create a database named `FeedFlow`
3. Update database credentials in `backend/feedflow/src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/FeedFlow
   spring.datasource.username=postgres
   spring.datasource.password=1234
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend/feedflow
   ```

2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   Or on Windows:
   ```cmd
   mvnw.cmd spring-boot:run
   ```

The backend will start on `http://localhost:8080` and automatically create sample data.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend/my-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`.

## API Endpoints

- `GET /api/posts?page={page}&limit={limit}` - Fetch paginated posts

## How Infinite Scrolling Works

1. **Initial Load**: Loads the first 10 posts on page load
2. **Intersection Observer**: Monitors when the user scrolls near the bottom
3. **Automatic Loading**: Fetches next page when the loader element becomes visible
4. **State Management**: Tracks loading state, current page, and whether more data exists
5. **Error Handling**: Provides retry functionality if requests fail

## Project Structure

```
FeedFlow/
├── backend/
│   └── feedflow/
│       ├── src/main/java/com/feedflow/
│       │   ├── config/          # Configuration classes
│       │   ├── controller/      # REST controllers
│       │   ├── model/          # JPA entities
│       │   └── repository/     # Data repositories
│       └── src/main/resources/
│           └── application.properties
├── frontend/
│   └── my-app/
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── styles/        # CSS files
│       │   ├── App.js         # Main application component
│       │   └── index.js       # Application entry point
│       └── package.json
└── README.md
```

## Key Features Implemented

### Frontend

- **Infinite Scrolling**: Uses Intersection Observer API for efficient scroll detection
- **Loading States**: Shows loading spinners and handles errors gracefully
- **Image Optimization**: Lazy loading with fallback for failed images
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Fade-in effects and hover transitions

### Backend

- **Pagination**: Spring Data JPA pagination support
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Data Initialization**: Automatic sample data creation on startup
- **Error Handling**: Proper HTTP status codes and error responses

## Troubleshooting

1. **CORS Issues**: Ensure backend is running on port 8080 and frontend on port 3000
2. **Database Connection**: Verify PostgreSQL is running and credentials are correct
3. **Port Conflicts**: Check if ports 3000 and 8080 are available
4. **Node Modules**: Try deleting `node_modules` and running `npm install` again

## Future Enhancements

- Add user authentication
- Implement post creation functionality
- Add real-time updates with WebSocket
- Implement image upload with cloud storage
- Add search and filtering capabilities
