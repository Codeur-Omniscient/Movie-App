import { Movie } from "../../types";

interface Props {
  movies: Movie[];
}

const NumResult = ({ movies }: Props) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

export default NumResult;
