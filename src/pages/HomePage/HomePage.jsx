import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesByTrand } from "../../movies-api";

import css from "./HomePage.module.css";

const HomePage = () => {
  const [trandMovies, setTrandMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTrandMovies = async () => {
      try {
        setLoading(true);
        setError(false);

        const movies = await fetchMoviesByTrand();
        setTrandMovies(movies);
      } catch (error) {
        console.log(error);
        alert(
          "Here should be a list of tranding movies but something went wrong...",
        );
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getTrandMovies();
  }, []);

  return (
    <div className={`container ${css["home-container"]}`}>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Something went wrong</p>}

      {!loading && <h1>Popular Today:</h1>}

      {trandMovies.length > 1 && <MovieList movies={trandMovies} />}
    </div>
  );
};

export default HomePage;
