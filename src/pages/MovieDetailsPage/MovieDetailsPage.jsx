"use client";

import { useState, useEffect, Suspense } from "react";
import {
  useParams,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { getMovieDetails } from "../../services/api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
        setError(null);
      } catch (error) {
        setError("Failed to fetch movie details. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLink);
  };

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return null;

  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const genres =
    movie.genres?.map((genre) => genre.name).join(", ") ||
    "No genres available";

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        ← Go back
      </button>

      <div className={styles.movieDetails}>
        <div className={styles.posterContainer}>
          {movie.poster_path ? (
            <img
              src={`${baseImageUrl}${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
          ) : (
            <div className={styles.noPoster}>No Image Available</div>
          )}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>
            {movie.title} {releaseYear && `(${releaseYear})`}
          </h1>

          <p className={styles.score}>
            <span className={styles.label}>User Score:</span>{" "}
            {Math.round(movie.vote_average * 10)}%
          </p>

          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.overview}>
            {movie.overview || "No overview available"}
          </p>

          <h2 className={styles.sectionTitle}>Genres</h2>
          <p className={styles.genres}>{genres}</p>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h3 className={styles.additionalTitle}>Additional information</h3>
        <ul className={styles.additionalList}>
          <li>
            <Link
              to={`/movies/${movieId}/cast`}
              state={{ from: backLink }}
              className={styles.additionalLink}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={`/movies/${movieId}/reviews`}
              state={{ from: backLink }}
              className={styles.additionalLink}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
