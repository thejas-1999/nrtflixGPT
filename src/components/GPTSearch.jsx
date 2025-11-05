import { BACKGROUND_IMAGE } from "../utils/constants";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div className="fixed -z-10 w-full h-full">
        <img
          src={BACKGROUND_IMAGE}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GPTSearch;
