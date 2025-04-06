import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.movieLink}
          >
            <div className={styles.moviePoster}>
              {movie.poster_path ? (
                <img
                  src={`${baseImageUrl}${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.posterImage}
                />
              ) : (
                <div className={styles.noPoster}>No Image</div>
              )}
            </div>
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <p className={styles.movieYear}>
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "Unknown Year"}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
