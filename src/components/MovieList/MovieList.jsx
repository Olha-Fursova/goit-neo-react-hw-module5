import { useLocation, Link } from "react-router-dom";

import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div className={css["movie-list-container"]}>
      {movies.map((movie) => (
        <Link
          className={css["movie-list-link"]}
          key={movie.id}
          to={`/movies/${movie.id}`}
          state={location}
        >
          <h3 className={css["movie-list-title"]}>{movie.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className={css["movie-list-img"]}
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
