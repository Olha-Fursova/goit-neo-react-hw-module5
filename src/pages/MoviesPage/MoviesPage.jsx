import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesByTitle } from "../../movies-api";

import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("movieName");

  useEffect(() => {
    if (!movieName) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchMoviesByTitle(movieName);
        setMovies(data?.results ?? []);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movieName]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const value = form.elements.movieName.value.trim();

    if (value === "") {
      alert("Please enter the search term!");
      return;
    }

    setSearchParams({ movieName: value });
  };

  return (
    <div className={`container ${css["movies-search-container"]}`}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input className={css["form-input"]} type="text" name="movieName" placeholder="Search..."/>
        <button className={css["form-btn"]} type="submit">
          Search
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Something went wrong</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
export default MoviesPage;
