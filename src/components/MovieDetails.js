import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../actions/actions";
import HomeIcon from "@mui/icons-material/Home";

function MovieDetails() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movieDetails);

  console.log(movie);
  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
  }, [dispatch, movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const {
    title,
    vote_average,
    release_date,
    runtime,
    credits: { crew, cast },
    overview,
    poster_path,
  } = movie;

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const length = `${hours}:${minutes.toString().padStart(2, "0")}`;

  return (
    <div className="details-page">
      <div className="movieDetails-header">
        <h3>Movie Details</h3>
        <div>
          <Link to="/" className="home-button">
            <HomeIcon />
          </Link>
        </div>
      </div>
      {movie ? (
        <>
          <div className="movieDetails">
            <div className="movieDetails_poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                className="movie-poster"
              />
            </div>
            <div className="movieDetails_desc">
              <h1>
                {title} ({vote_average.toFixed(1)})
              </h1>
              <p>
                <b>{release_date}</b> | <b>{length}</b> |{" "}
                <b> {crew.find((member) => member.job === "Director").name}</b>
              </p>
              <p>Cast: {cast.map((actor) => actor.name).join(", ")}</p>
              <p>Description: {overview}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetails;
