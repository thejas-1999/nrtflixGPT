import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import genAI from "../utils/geminiAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.preferdLanguage);
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleSearch = async () => {
    const query = searchText.current.value.trim();
    if (!query) return;

    const prompt = `Act as a movie recommendation system and suggest at least 5 movies for: ${query}.
  Give only names, comma separated. Example: Kill, Sholay, Don, Golmaal, Koi Mil Gaya`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);

      const genAIMovies = result.response
        .text()
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      console.log("🎬 GenAI Suggested Movies:", genAIMovies);

      const moviePromises = genAIMovies.map(async (movie) => {
        const tmdbResults = await searchMovieTMDB(movie);

        const exactMatches = tmdbResults.filter((r) => {
          const tmdbTitle = r.title?.toLowerCase().trim() || "";
          const queryTitle = movie.toLowerCase().trim();
          return tmdbTitle === queryTitle;
        });

        return exactMatches.length > 0
          ? exactMatches
          : [{ title: movie, notFound: true }];
      });

      const allResults = await Promise.all(moviePromises);
      const tmdbMovies = allResults;

      dispatch(
        addGptMovieResults({
          movieNames: genAIMovies,
          movieResults: tmdbMovies,
        })
      );

      console.log("🎥 Exact-Match TMDB Movies:", tmdbMovies);

      // ✅ Clear the input after search
      searchText.current.value = "";
    } catch (err) {
      console.error("Error calling Gemini API:", err);
    }
  };

  return (
    <div className="p-[12%] flex justify-center">
      <form
        className="w-full max-w-3xl bg-black grid grid-cols-12 gap-2 sm:gap-4 p-2 sm:p-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-12 sm:col-span-9 p-3 sm:p-4 m-0 sm:m-4 bg-white placeholder:text-sm rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          className="col-span-12 sm:col-span-3 py-2 px-4 bg-red-700 text-white m-0 sm:m-4 rounded-lg cursor-pointer"
          onClick={handleSearch}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
