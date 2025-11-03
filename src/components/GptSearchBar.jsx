import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.preferdLanguage);
  return (
    <div className="p-[10%] flex justify-center">
      <form className=" w-1/2 bg-black grid grid-cols-12" action="">
        <input
          type="text"
          className="p-4 m-4 bg-white col-span-9 placeholder:text-sm"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button className="py-2 px-4 bg-red-700 text-white m-4 rounded-lg col-span-3 cursor-pointer">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
