import { Movie } from "../types";

interface Props {
  movie: Movie;
  onSelectMovie: (id: string | null) => void;
}

const Movies = ({ movie, onSelectMovie }: Props) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)} role="presentation">
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movies;
