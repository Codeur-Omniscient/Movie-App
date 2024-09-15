import { useState } from "react";
import { WatchedMovie } from "./types";
import "./index.css";
import Navbar from "./components/ui/Navbar";
import Main from "./components/ui/Main";
import Logo from "./components/ui/Logo";
import Search from "./components/ui/Search";
import NumResult from "./components/ui/NumResult";
import Box from "./components/ui/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import MovieList from "./components/ui/MovieList";
import Loader from "./components/ui/Loader";
import ErrorMessage from "./components/ui/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import useLocalStorageState from "./hooks/useLocalStorageState";

const KEY: string = "1948f44d";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("Matrix");
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id: string | null): void {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie(): void {
    setSelectedID(null);
  }

  function handleAddWatched(movie: WatchedMovie): void {
    setWatched((watched: any) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string | null): void {
    setWatched(
      watched.filter((movie: { imdbID: string | null }) => movie.imdbID !== id)
    );
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              apiKey={KEY}
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export default App;
