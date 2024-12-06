import axios from "axios";
import { movieApiKey } from "./apiKey";



const apiBaseUrl="https://api.themoviedb.org/3";
const trendingMoviesEndpoint=`${apiBaseUrl}/trending/movie/day?api_key=${movieApiKey}`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${movieApiKey}`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${movieApiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${movieApiKey}`;
const genresEndpoint = `${apiBaseUrl}/genre/movie/list?api_key=${movieApiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${movieApiKey}`;

// Movie Details Endpoint
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${movieApiKey}`;

const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${movieApiKey}`;

const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${movieApiKey}`;

// Cast Api call to get  cast of movie
const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${movieApiKey}`;

const personMovieEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${movieApiKey}`;

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



export const fetchPersonDetails = (id) => {
  return movieApiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return movieApiCall(personMovieEndpoint(id));
};
