import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";

const MovieList = ({ title, movies }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // simulate load
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-6 md:px-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl py-3 sm:py-4 text-white font-semibold tracking-wide">
        {title}
      </h1>

      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 sm:gap-4">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
