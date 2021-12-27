import React from 'react';
import Head from 'next/head';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { apiKey, apiBase } from '../lib/tmdb';
import styles from '../styles/Home.module.css';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { SearchRounded } from '@material-ui/icons';
import Header from '../components/header';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [movieList, setMovieList] = useState([])

  const handleClick = async () => {
    if (searchText !== '') {
      const result = await fetch(`${apiBase}/search/movie?api_key=${apiKey}&language=pt-BR&query=${searchText}`)
      const json = await result.json();
      setMovieList(json.results)
    }
  }


  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleClick();
    }
  }

  useEffect(() => {
    Aos.init({
      duration: '1000',
    });
  }, [])
  
  return (
      <div>
        <Head>
          <title>
            Buscar
          </title>
        </Head>
        <Header />
        <main className={styles.main}>
          <div className={styles.searchbox}>
              <TextField
                fullWidth
                placeholder="Busque seu filme"
                size="small"
                name="searchText"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                onKeyPress={handleKeyDown}
              />
              <Button variant="text" onClick={handleClick} type="button">{<SearchRounded color="secondary" />}
              </Button>
            </div>
          {<ul className={styles.movielist}>
            {movieList.map(item => (
                  <li data-aos="zoom-in-up" key={item.title} className={styles.moviecard}>
                    <a href={`/movie/${item.id}`}>
                      <img width="200" src={`https://images.tmdb.org/t/p/original${item.poster_path}`} alt={item.title} />
                      <br />
                      <p>{item.title}</p>
                    </a>
                  </li>
                ))}
          </ul>}
        </main>
      </div>
  )
}