import axios from "axios";

export const FETCH_UPCOMING_MOVIES_SUCCESS = "FETCH_UPCOMING_MOVIES_SUCCESS";
export const SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS";
export const FETCH_MOVIE_DETAILS_SUCCESS = "FETCH_MOVIE_DETAILS_SUCCESS";
export const APPEND_UPCOMING_MOVIES = "APPEND_UPCOMING_MOVIES";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
console.log(API_KEY);
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchUpcomingMoviesSuccess = (movies) => ({
  type: FETCH_UPCOMING_MOVIES_SUCCESS,
  payload: movies,
});

export const searchMoviesSuccess = (movies) => ({
  type: SEARCH_MOVIES_SUCCESS,
  payload: movies,
});

export const fetchMovieDetailsSuccess = (movieDetails) => ({
  type: FETCH_MOVIE_DETAILS_SUCCESS,
  payload: movieDetails,
});

export const appendUpcomingMovies = (movies) => ({
  type: APPEND_UPCOMING_MOVIES,
  payload: movies,
});

export const fetchUpcomingMovies = (page) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`
    );
    const movies = response.data.results;
    dispatch({
      type: APPEND_UPCOMING_MOVIES,
      payload: movies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchMovies = (query) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const movies = response.data.results;
    dispatch({ type: SEARCH_MOVIES_SUCCESS, payload: movies });
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetails = (movieId) => async (dispatch) => {
  try {
    const params = {
      api_key: API_KEY,
      language: "en-US",
      append_to_response: "credits",
    };
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params,
    });
    const movieDetails = response.data;
    dispatch({ type: FETCH_MOVIE_DETAILS_SUCCESS, payload: movieDetails });
  } catch (error) {
    console.log(error);
  }
};
