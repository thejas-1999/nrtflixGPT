import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { openMovieModal } from "../utils/moviesSlice";

const MovieCard = ({ posterPath, movie }) => {
  const dispatch = useDispatch();
  if (!posterPath) return null;

  return (
    <div className="flex-shrink-0 w-36 sm:w-48 md:w-52 lg:w-56 pr-3">
      <div
        className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
        onClick={() => dispatch(openMovieModal(movie))}
      >
        <img
          src={IMG_CDN_URL + posterPath}
          alt={movie?.title || "movie-card"}
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default MovieCard;
