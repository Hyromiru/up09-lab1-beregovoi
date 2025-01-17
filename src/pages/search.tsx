import { useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import OMDBApi, { IMovie } from "../shared/api/api";
import Movie from "../components/movie";
import { LikedMoviesStore } from "../store/store";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<IMovie[]>([]);
  const [showLiked, setShowLiked] = useState(false);

  const { likedMovies } = LikedMoviesStore((state) => state);

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await OMDBApi.searchMovie(searchValue);
    setSearchResult(res.Search);
  };

  const likedMoviesDetails = async (): Promise<IMovie[]> => {
    // Получаем подробную информацию о каждом лайкнутом фильме
    const promises = likedMovies.map((id) => OMDBApi.searchSingleMovie(id));
    return Promise.all(promises);
  };

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  const handleShowLikedMovies = async () => {
    if (showLiked) {
      // Если режим отображения лайкнутых выключен, сбрасываем
      setShowLiked(false);
      setSearchResult([]);
    } else {
      // Если включаем режим лайкнутых, загружаем их
      const likedMoviesData = await likedMoviesDetails();
      setSearchResult(likedMoviesData as IMovie[]); // Преобразуем в список фильмов
      setShowLiked(true);
    }
  };

  return (
    <>
      <h1>Search Movie</h1>
      <form onSubmit={handleClick} action="">
        <Input value={searchValue} setValue={setSearchValue} />
        <Button />
      </form>
      <button
        onClick={handleShowLikedMovies}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {showLiked ? "Back to Search" : "Show Liked Movies"}
      </button>
      {searchResult.map((element) => (
        <Movie key={element.imdbID} {...element} />
      ))}
    </>
  );
};

export default Search;
