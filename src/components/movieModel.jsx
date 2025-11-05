import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMovieModal } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const MovieModal = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedMovie } = useSelector((state) => state.movies);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    if (!selectedMovie) return;

    const fetchTrailer = async () => {
      try {
        console.log("Fetching trailer for movie ID:", selectedMovie.id);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?language=en-US`,
          API_OPTIONS
        );
        const data = await response.json();
        console.log("Trailer API response:", data);

        const trailerVideo =
          data.results?.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          ) || data.results?.[0];

        setTrailer(trailerVideo || null);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [selectedMovie]);

  if (!isModalOpen || !selectedMovie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-3xl text-white relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => dispatch(closeMovieModal())}
          className="absolute top-3 right-4 text-2xl hover:text-red-400 transition-colors cursor-pointer"
        >
          ✖
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left - Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            className="rounded-lg w-full md:w-1/3 object-cover"
          />

          {/* Right - Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{selectedMovie.title}</h2>
            <p className="text-sm text-gray-300 mb-4">
              {selectedMovie.overview}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
              <p>
                <span className="font-semibold text-white">Release:</span>{" "}
                {selectedMovie.release_date || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-white">Rating:</span> ⭐{" "}
                {selectedMovie.vote_average?.toFixed(1) || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-white">Language:</span>{" "}
                {selectedMovie.original_language?.toUpperCase() || "N/A"}
              </p>
            </div>

            {trailer ? (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
                  title={selectedMovie.title}
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ) : (
              <p className="text-gray-400 text-center">No trailer available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
