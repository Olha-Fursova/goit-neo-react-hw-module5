import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  NavLink,
  Link,
  Outlet,
} from "react-router-dom";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";
import { fetchMovieDetails } from "../../movies-api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    if (!movieId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css["extras-link"], isActive && css.active);
  };

  return (
    <div className={`container ${css["movie-container"]}`}>
      <Link  className={css["movie-back-link"]} to={backLinkRef.current}>Go back</Link>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Something went wrong.</p>}

      {movieDetails && (
        <div className={css["movie-main-content"]}>
          <img
            className={css["movie-poster"]}
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={`${movieDetails.original_title} poster`}
          />
          <div className={css["movie-info"]}>
            <h2 className={css["movie-title"]}>{movieDetails.original_title}</h2>
            <div className={css["movie-dates"]}>
              <p className={css["movie-date"]}>Released: {movieDetails.release_date}</p>
              <p className={css["movie-date"]}>User search: {movieDetails.popularity}</p>
            </div>

            <ul className={css["movie-genre-list"]}>
              {movieDetails.genres?.map((genre) => (
                <li className={css["movie-genre"]} key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <p className={css["movie-overview"]}>{movieDetails.overview}</p>
          </div>
        </div>
      )}
      <nav className={css["movie-extras"]}>
        <NavLink to="cast" className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
