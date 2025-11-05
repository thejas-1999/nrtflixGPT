import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { openMovieModal } from "../utils/moviesSlice";

const MovieCard = ({ posterPath, movie }) => {
  const dispatch = useDispatch();
  if (!posterPath) return null;

  return (
    <div className="w-48  pr-4">
      <div
        className="w-48 pr-4 cursor-pointer hover:scale-105 transition-transform duration-200"
        onClick={() => dispatch(openMovieModal(movie))}
      >
        <img src={IMG_CDN_URL + posterPath} alt="movie-card" />
      </div>
    </div>
  );
};
export default MovieCard;
