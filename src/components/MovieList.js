import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUpcomingMovies, searchMovies } from "../actions/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

function MovieList() {
  const dispatch = useDispatch();
  const { upcomingMovies, searchResults } = useSelector(
    (state) => state.movies
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  console.log("Page Initial", page);
  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  const loadMoreMovies = () => {
    const nextPage = page + 1;

    dispatch(fetchUpcomingMovies(nextPage))
      .then((newMovies) => {
        if (newMovies && newMovies.length === 0) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });

    setPage(nextPage);
  };

  console.log("Page Final", page);
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setPage(1);
    setHasMore(true);

    if (query.trim() === "") {
      dispatch(fetchUpcomingMovies());
    } else {
      dispatch(searchMovies(query));
    }
  };

  const moviesToDisplay =
    searchQuery.trim() === "" ? upcomingMovies : searchResults;

  const renderMovieCards = () => {
    return moviesToDisplay.map((movie) => (
      <Link to={`/details/${movie.id}`} key={movie.id} className="movie-link">
        <div className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <h2 className="title">{movie.title}</h2>
          <p className="rating">({movie.vote_average.toFixed(1)})</p>
          <p className="description">{movie.overview}</p>
        </div>
      </Link>
    ));
  };

  return (
    <div>
      <div className="search-bar">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Link to="/" className="home-button">
          <HomeIcon />
        </Link>
      </div>
      <InfiniteScroll
        dataLength={moviesToDisplay.length}
        next={loadMoreMovies}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
      >
        <div className="movie-list">{renderMovieCards()}</div>
      </InfiniteScroll>
    </div>
  );
}

export default MovieList;
