import { WatchedMovie } from "../types";
import WatchedMovies from "./WatchedMovies";

interface Props {
  watched: WatchedMovie[];
  onDeleteWatched: (id: string | null) => void;
}

const WatchedMovieList = ({ watched, onDeleteWatched }: Props) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovies
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
