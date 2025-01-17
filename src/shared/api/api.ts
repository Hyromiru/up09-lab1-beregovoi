import axios from "axios";

const BASE_URL = "https://www.omdbapi.com/";

const OMDBApiInstance = axios.create({ baseURL: BASE_URL });

const API_KEY = import.meta.env.VITE_API_KEY;

export interface IMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: number;
  imdbID: string;
}

export interface SingleMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: number;
  imdbID: string;
}

interface iSearchMovieRDO {
  Response: string;
  totalResults: string;
  Search: IMovie[];
}

interface iSearchMovieIdRDO {
  Response: string;
  totalResults: string;
  Search: SingleMovie;
}


const OMDBApi = {
  searchMovie: async (title: string) => {
    const res = await OMDBApiInstance.get<iSearchMovieRDO>("", {
      params: { apikey: API_KEY, s: title },
    });
    console.log(res.data);
    return res.data;
  },
  searchSingleMovie: async (id: string) => {
    const res = await OMDBApiInstance.get<iSearchMovieIdRDO>("", {
      params: { apikey: API_KEY, i: id },
    });
    console.log(res.data);
    return res.data;
  },
};
export default OMDBApi;
