import { Movie } from "../../types";
import Movies from "../Movies";

interface Props {
  movies: Movie[];
  onSelectMovie: (id: string | null) => void;
}
const MovieList = ({ movies, onSelectMovie }: Props) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movies
          movie={movie}
          onSelectMovie={onSelectMovie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
};

export default MovieList;
