import axios from "axios"
import { IMovieRDO } from "../../entities/movie/movie.rdo";

const BASE_URl = import.meta.env.VITE_API;

const OMDBApiInstance = axios.create({ baseURL: BASE_URl });

const API_KEY = import.meta.env.VITE_API_KEY;

const OMDBApi = {
    searchMovie: async (title: string) => {
        const res = await OMDBApiInstance.get<IMovieRDO>("", {
            params: { apikey: API_KEY, s: title },
        });
        return res.data
    },
};

export default OMDBApi

function powerOfTwo (n: number) {
    return n ** 2
} 

console.log(powerOfTwo(2));
