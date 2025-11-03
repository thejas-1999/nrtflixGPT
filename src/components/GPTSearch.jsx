import { BACKGROUND_IMAGE } from "../utils/constants";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <div>
      <div className=" absolute -z-10 w-full h-full">
        <img className="" src={BACKGROUND_IMAGE} alt="logo" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};
export default GPTSearch;
