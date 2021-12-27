import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { apiBase, apiKey } from '../lib/tmdb';
import Header from '../components/header';
import styles from '../styles/Home.module.css';

export default function Genres({ list }) {
  const [movies, setMovies] = useState([]);
  const [currentGenre, setCurrentGenre] = useState('Gêneros');

  const getMovies = async (id) => {
    const result = await fetch(`${apiBase}/discover/movie?with_genres=${id}&language=pt-BR&api_key=${apiKey}`)
    const json = await result.json();
    setMovies(json.results);

    list.forEach((item) => {
      if (item.id === id) {
        setCurrentGenre(item.name)
      }
    })
  }

  useEffect(() => {
    Aos.init({
      duration: '1000'
    })
  }, []);

  useEffect(() => {
    console.log(currentGenre)
  }, [movies])

  return (
    <div>
      <Head>
        <title>
          {currentGenre}
        </title>
      </Head>
      <Header />
      <main className={styles.main}>
        <ul className={styles.genrelist}>
            {list.map(item => (
              <li data-aos="flip-right" className={styles.genrecard} key={ item.id }>
                <p onClick={ () => getMovies(item.id) }>{item.name}</p>
              </li>
            ))}
          </ul>
        <div>
        <ul className={styles.movielist}>
              {movies.length > 0 && movies.map(movie => (
                <li data-aos="fade-up" className={styles.moviecard} key={movie.title}>
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

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/genre')
  const json = await res.json();
  return {
    props: {
      list: json.list,
    }
  }
}