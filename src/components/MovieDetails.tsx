import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./ui/Loader";
import { WatchedMovie } from "../types";

interface Prop {
  selectedID: string | null;
  onCloseMovie: () => void;
  onAddWatchedMovie: (movie: WatchedMovie) => void;
  apiKey: string;
  watched: WatchedMovie[];
}

const MovieDetails = ({
  selectedID,
  onCloseMovie,
  apiKey,
  onAddWatchedMovie,
  watched,
}: Prop) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  console.log(runtime);
  function handleAdd() {
    const newWatchedMovie: WatchedMovie = {
      imdbID: selectedID,
      Title: title as string,
      Year: year as string,
      Poster: poster as string,
      imdbRating: Number(imdbRating),
      runtime: Number((runtime || "0 min").split(" ")[0]),
      userRating,
    };
    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  }

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  useEffect(() => {
    async function getMovieDetails() {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedID}`
      );

      const data = await res.json();
      console.log(data);
      setMovie(data);
      setLoading(false);
    }

    getMovieDetails();
  }, [apiKey, selectedID]);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button type="button" className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    color="#fcc491"
                    setUserRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      type="button"
                      className="btn-add"
                      onClick={handleAdd}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rate this movie {watchedUserRating}{" "}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
