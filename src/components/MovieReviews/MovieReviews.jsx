import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../movies-api";

import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div className="container">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Something went wrong...</p>}

      {!loading && movieReviews.length === 0 && <p>No reviews found.</p>}
      <ul className={css["reviews-list"]}>
        {movieReviews.slice(0, 5).map((review) => (
          <li className={css["reviews-list-item"]} key={review.id}>
            <h3 className={css["reviews-username"]}>{review.author_details.username}</h3>
            <p className={css["reviews-content"]}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
