import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trailerVideo: null,
    selectedMovie: null,
    isModalOpen: false,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    openMovieModal: (state, action) => {
      state.isModalOpen = true;
      state.selectedMovie = action.payload;
    },
    closeMovieModal: (state) => {
      state.isModalOpen = false;
      state.selectedMovie = null;
      state.trailerVideo = null;
    },
  },
});
export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addTrailerVideo,
  openMovieModal,
  closeMovieModal,
} = moviesSlice.actions;
export default moviesSlice.reducer;
