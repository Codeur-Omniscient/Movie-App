export interface Movie {
  imdbID: string | null;
  Title: string;
  Year: string;
  Poster: string;
}

export interface WatchedMovie extends Movie {
  runtime: number;
  imdbRating: number;
  userRating: number;
}
