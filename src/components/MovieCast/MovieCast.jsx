"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../services/api";
import Loader from "../Loader/Loader";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const castData = await getMovieCast(movieId);
        setCast(castData);
        setError(null);
      } catch (error) {
        setError("Failed to fetch cast information. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;
  if (cast.length === 0)
    return (
      <p className={styles.noCast}>
        No cast information available for this movie.
      </p>
    );

  const baseImageUrl = "https://image.tmdb.org/t/p/w200";

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cast</h2>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            {actor.profile_path ? (
              <img
                src={`${baseImageUrl}${actor.profile_path}`}
                alt={actor.name}
                className={styles.actorImage}
              />
            ) : (
              <div className={styles.noImage}>No Image</div>
            )}
            <div className={styles.actorInfo}>
              <p className={styles.actorName}>{actor.name}</p>
              <p className={styles.character}>
                Character: {actor.character || "Unknown"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
