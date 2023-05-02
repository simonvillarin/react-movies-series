import axios from "axios";
import { API_KEY } from "env";

export const getShows = async (category) => {
  return await axios.get(
    `https://api.themoviedb.org/3/trending/${category}/day?api_key=${API_KEY}&language=en-US`
  );
};

export const getSearchResults = async (search) => {
  return await axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${search}&include_adult=false`
  );
};

export const getShowById = async (type, id) => {
  return await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`
  );
};

export const getGenres = async (category) => {
  return await axios.get(
    `https://api.themoviedb.org/3/genre/${category}/list?api_key=${API_KEY}&language=en-US`
  );
};

export const getFilterResult = async (category, genreIds) => {
  return await axios.get(
    `https://api.themoviedb.org/3/discover/${category}?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=${genreIds}`
  );
};
