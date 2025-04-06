import axios from "axios";
import { API_PATH } from "constants/api";

const ACCESS_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2VmNjc2Njg2YzZmNDBhNDg0MzIwYTdlNTYwYjkwYSIsIm5iZiI6MTc0Mzk0NjcwMS4xMDksInN1YiI6IjY3ZjI4M2NkZTFkNWMyM2M2ZWQ5NTY3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t9-JkI2fQOveFZCIdiytySTfuFIHLmYmgBmCKSq43YE";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers = {
  Authorization: `Bearer ${ACCESS_KEY}`,
  accept: "application/json",
};

export const fetchTrendMovies = async () => {
  const response = await axios.get(API_PATH.trend, {});
  return response.data;
};

export const fetchSearchMovie = async (query, page = 1) => {
  const response = await axios.get(API_PATH.search, {
    params: {
      query,
      page,
    },
  });

  return response.data;
};

export const fetchMovieById = async (id) => {
  const response = await axios.get(API_PATH.movie + id + "?");
  return response.data;
};

export const fetchMovieCredits = async (id) => {
  const response = await axios.get(API_PATH.movie + id + "/credits?");
  return response.data;
};

export const fetchMovieReview = async (id) => {
  const response = await axios.get(API_PATH.movie + id + "/reviews?");
  return response.data;
};
