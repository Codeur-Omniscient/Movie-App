import { WatchedMovie } from "../types";
import average from "../utils";

interface Props {
  watched: WatchedMovie[];
}

const WatchedSummary = ({ watched }: Props) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating: number = average(
    watched.map((movie) => movie.userRating)
  );
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedSummary;
