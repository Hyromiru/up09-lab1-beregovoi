export interface IMovieRDO {
    Response: string,
    totalResults: string
    Search: IMovie[]
}

interface IMovie {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}