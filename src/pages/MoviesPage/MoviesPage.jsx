"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { searchMovies } from "../../services/api";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
        setError(null);
      } catch (error) {
        setError("Failed to search movies. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>

      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for a movie..."
          className={styles.searchInput}
          required
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        <>
          {query && movies.length === 0 && !loading ? (
            <p className={styles.noResults}>No movies found for "{query}"</p>
          ) : (
            query && <MovieList movies={movies} />
          )}
        </>
      )}
    </div>
  );
};

export default MoviesPage;
