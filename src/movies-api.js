import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const MY_ACCESS_KEY = import.meta.env.VITE_TMDB_KEY;

export const fetchMoviesByTitle = async (query, page = 1) => {
  try {
    const response = await axios.get(`/search/movie`, {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMoviesByTrand = async (page = 1) => {
  try {
    const response = await axios.get("/trending/movie/day", {
      params: { page },
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
    });
    return response.data.results.slice(0, 12);
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieCast = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/credits`, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
    });
    return response.data.cast;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};