import React, { useEffect, useState } from 'react';
import { apiBase, apiKey } from '../lib/tmdb';
import Header from '../components/header';
import styles from '../styles/Home.module.css';

export default function Genres({ list }) {
  const [movies, setMovies] = useState([]);

  const getMovies = async (id) => {
    const result = await fetch(`${apiBase}/discover/movie?with_genres=${id}&language=pt-BR&api_key=${apiKey}`)
    const json = await result.json();
    setMovies(json.results);
  }

  useEffect(() => {
    console.log(movies)
  }, [movies])
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <ul className={styles.genrelist}>
            {list.map(item => (
              <li className={styles.genrecard} key={ item.id }>
                <p onClick={ () => getMovies(item.id) }>{item.name}</p>
              </li>
            ))}
          </ul>
        <div>
        <ul className={styles.movielist}>
              {movies.length > 0 && movies.map(movie => (
                <li className={styles.moviecard} key={movie.title}>
                    <a href={`/movie/${movie.id}`}>
                      <img width="200" height="300" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                      <br />
                      <p>{movie.title}</p>
                    </a>
                </li>
              ))}
            </ul>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/genre')
  const json = await res.json();
  return {
    props: {
      list: json.list,
    }
  }
}