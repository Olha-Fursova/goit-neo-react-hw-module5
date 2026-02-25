# Movie Search App with Routing

## Project Overview

This project is a React-based Movie Search Application that uses routing to navigate between different pages of the app. The goal was to practice working with HTTP requests, modular components, and client-side routing while creating a fully functional app for searching and exploring movies.

The app communicates with The Movie Database (TMDB) API, fetching trending movies, searching for films by name, and providing detailed information about each movie, including cast and reviews. Through this project, I reinforced skills in asynchronous requests, React Router, state management, and dynamic rendering of content.

## How It Works

Upon entering the app, users land on the HomePage, which displays a list of today’s trending movies. The app fetches this data automatically when the component mounts, giving users an immediate overview of popular films. Each movie is displayed as a clickable card, and selecting a movie navigates the user to a MovieDetailsPage, where detailed information about the selected movie is shown, including its poster, description, and user ratings.

Users can explore the cast and reviews for each movie on the same page through nested routes. Navigation is smooth, and the app ensures that users can always return to the previous page they were on. If a user tries to access an invalid route, a NotFoundPage appears with a friendly message and a link back to the homepage.

## Components Structure

The project follows a clear modular structure:

- src/pages contains the main pages: HomePage, MoviesPage, MovieDetailsPage, and NotFoundPage.

- src/components contains reusable components: MovieCast, MovieReviews, MovieList, and Navigation.

- The MovieList component is used on both HomePage and MoviesPage to render movie cards dynamically. Each movie card links to its details page and passes state through the Link component for proper navigation.

Each page and component manages its own state for data, loading, and errors, ensuring that the UI reacts appropriately to asynchronous requests. The useEffect hook is used to fetch data when needed, such as trending movies on mount or search results when query parameters change.

## How to Run

1. Clone the repository.
2. Install dependencies with:
npm install  
3. Start the development server:
npm run dev  
4. Open the provided local URL in your browser to explore trending movies and search functionality.

## Technologies Used

- React

- React Router

- Axios

- TMDB API

- React.lazy and Suspense

- Modular component architecture

## Conclusion

This project allowed me to experience building a real-world frontend application with dynamic routing and external API integration. By combining state management, HTTP requests, and modular components, I created a responsive, interactive movie search app. Users can easily browse trending movies, search for specific films, and view detailed information without ever feeling disconnected from the app’s navigation flow.
