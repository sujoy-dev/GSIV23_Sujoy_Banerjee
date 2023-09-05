import {
  FETCH_UPCOMING_MOVIES_SUCCESS,
  SEARCH_MOVIES_SUCCESS,
  FETCH_MOVIE_DETAILS_SUCCESS,
  APPEND_UPCOMING_MOVIES,
} from "../actions/actions";

const initialState = {
  upcomingMovies: [],
  searchResults: [],
  movieDetails: null,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        upcomingMovies: action.payload,
      };
    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        movieDetails: action.payload,
      };
    case APPEND_UPCOMING_MOVIES:
      return {
        ...state,
        upcomingMovies: [...state.upcomingMovies, ...action.payload],
      };
    default:
      return state;
  }
};

export default moviesReducer;
