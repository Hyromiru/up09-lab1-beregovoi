import { IMovie } from "../shared/api/api";
import { LikedMoviesStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import EmptyMoviePoster from "./Empty.jpg";
import HeartIcon from "./HeartIcon.svg";
import EmptyHeartIcon from "./EmptyHeartIcon.svg";

const Movie = (props: IMovie) => {
  const navigate = useNavigate();
  const { addLikedMovies, removeLikedMovies, likedMovies } = LikedMoviesStore((state) => state);

  const isLiked = likedMovies.includes(props.imdbID);

  const goToMoviePage = () => {
    navigate(`/movie/${props.imdbID}`);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // предотвращаем переход на страницу фильма при клике на лайк
    if (isLiked) {
      removeLikedMovies(props.imdbID);
    } else {
      addLikedMovies(props.imdbID);
    }
  };

  return (
    <div className="film_card" onClick={goToMoviePage} style={{ cursor: "pointer" }}>
      <img
        src={props.Poster !== "N/A" ? props.Poster : EmptyMoviePoster}
        alt={props.Title}
        style={{ width: "250px", height: "auto" }}
      />
      <h4 className="film-name">{props.Title}</h4>
      <p className="movie-type">{props.Type}</p>
      <div className="year-like-section">
        <span>{props.Year}</span>
        <button
        onClick={toggleLike}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
          padding: "8px",
        }}
      >
        <img
          src={isLiked ? EmptyHeartIcon : HeartIcon}
          alt={isLiked ? "Liked" : "Not Liked"}
          style={{ width: "24px", height: "24px" }}
        />
      </button>
      </div>
    </div>
  );
};

export default Movie;
