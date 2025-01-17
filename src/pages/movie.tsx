import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OMDBApi, { SingleMovie } from "../shared/api/api";
import { LikedMoviesStore } from "../store/store";
import EmptyMoviePoster from "./Empty.jpg";
import HeartIcon from "./HeartIcon.svg";
import EmptyHeartIcon from "./EmptyHeartIcon.svg";

const MoviePage = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const { addLikedMovies, removeLikedMovies, likedMovies } = LikedMoviesStore((state) => state);

  const isLiked = imdbID ? likedMovies.includes(imdbID) : false;

  useEffect(() => {
    const fetchMovie = async () => {
      if (imdbID) {
        try {
          const fetchedMovie = await OMDBApi.searchSingleMovie(imdbID);
          setMovie(fetchedMovie);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
    };
    fetchMovie();
  }, [imdbID]);

  const toggleLike = () => {
    if (imdbID) {
      if (isLiked) {
        removeLikedMovies(imdbID);
      } else {
        addLikedMovies(imdbID);
      }
    }
  };

  return (
    <div className="movie_page">
      {movie ? (
        <div>
          <h1>{movie.Title}</h1>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : EmptyMoviePoster}
            alt={movie.Title}
            style={{ width: "300px", height: "450px" }}
          />
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <button
            onClick={toggleLike}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              outline: "none",
              marginTop: "16px",
            }}
          >
            <img
              src={isLiked ? HeartIcon : EmptyHeartIcon}
              alt={isLiked ? "Liked" : "Not Liked"}
              style={{ width: "32px", height: "32px" }}
            />
          </button>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MoviePage;
