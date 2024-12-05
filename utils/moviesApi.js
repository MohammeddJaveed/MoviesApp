import axios from "axios";
import { movieApiKey } from "./apiKey";



const apiBaseUrl="https://api.themoviedb.org/3";
const trendingMoviesEndpoint=`${apiBaseUrl}/trending/movie/day?api_key=${movieApiKey}`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${movieApiKey}`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${movieApiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${movieApiKey}`;
const genresEndpoint = `${apiBaseUrl}/genre/movie/list?api_key=${movieApiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${movieApiKey}`;

const movieApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// Functions to get Images of different sizes and width
export const image500 = (posterpath) =>
  posterpath ? "https://image.tmdb.org/t/p/w500" + posterpath : null;

export const fetchTrendingMovie = () => {
  return movieApiCall(trendingMoviesEndpoint);
};


export const fetchPopularMovie = () => {
  return movieApiCall(popularMoviesEndpoint);
};

export const fetchUpComingMovie = () => {
  return movieApiCall(upComingMoviesEndpoint);
};

export const fetchTopRatedMovie = () => {
  return movieApiCall(topRatedMoviesEndpoint);
};

export const fetchGenres = () => {
  return movieApiCall(genresEndpoint);
};

export const fetchMovieDetails = (id) => {
  return movieApiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (movieId) => {
  return movieApiCall(movieCreditsEndpoint(movieId));
};

export const fetchSimilarMovies = (movieId) => {
  return movieApiCall(similarMoviesEndpoint(movieId));
};

export const searchMovies = (params) => {
  return movieApiCall(searchMoviesEndpoint, params);
};
