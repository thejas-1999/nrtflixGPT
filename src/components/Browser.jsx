import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";

const Browser = () => {
  useNowPlayingMovies();
  return (
    <>
      <Header />
    </>
  );
};
export default Browser;
