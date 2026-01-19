import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.module.css";
import Navigation from "../Navigation/Navigation";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(
  () => import("../../pages/MovieDetailsPage/MovieDetailsPage"),
);
const NotFoundPage = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage"),
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<p className="loading">Loading page...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
