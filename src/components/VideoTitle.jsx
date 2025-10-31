import { FaPlay, FaInfoCircle } from "react-icons/fa";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[20%] px-20 absolute text-white bg-linear-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/3">{overview}</p>

      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-white hover:bg-white/70 text-black p-4 px-10 text-xl font-semibold rounded-lg cursor-pointer">
          <FaPlay /> Play
        </button>

        <button className="flex items-center gap-2 bg-gray-500/50 text-white p-4 px-10 text-xl rounded-lg cursor-pointer">
          <FaInfoCircle /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
