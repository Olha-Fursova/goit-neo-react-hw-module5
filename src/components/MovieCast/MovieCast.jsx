import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../movies-api";

import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchMovieCast(movieId);
        console.log(data);
        setMovieCast(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className="container">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Something went wrong</p>}

      {!loading && movieCast.length === 0 && <p>No cast information</p>}
      <ul className={css["cast-list"]}>
        {movieCast.slice(0, 10).map((cast) => (
          <li key={cast.id} className={css["cast-list-item"]}>
            {cast.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt={cast.name}
                className={css["cast-img"]}
              />
            )}
            <h3 className={css["cast-name"]}>{cast.name}</h3>
            <p className={css["cast-character-name"]}>{cast.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
