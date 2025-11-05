import { FaPlay, FaInfoCircle } from "react-icons/fa";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[25%] sm:pt-[20%] px-4 sm:px-10 md:px-20 absolute text-white bg-gradient-to-r from-black to-transparent">
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
        {title}
      </h1>

      {/* Hide overview on mobile */}
      <p className="hidden sm:block py-4 sm:py-6 text-sm sm:text-base md:text-lg w-full sm:w-2/3 md:w-1/3 text-gray-200 leading-relaxed">
        {overview}
      </p>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        <button className="flex items-center gap-2 bg-white hover:bg-white/80 text-black py-2 sm:py-3 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-lg transition">
          <FaPlay className="text-sm sm:text-base" /> Play
        </button>

        <button className="flex items-center gap-2 bg-gray-500/60 hover:bg-gray-500/80 text-white py-2 sm:py-3 px-6 sm:px-8 text-base sm:text-lg rounded-lg transition">
          <FaInfoCircle className="text-sm sm:text-base" /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
