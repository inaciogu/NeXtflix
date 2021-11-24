import React from 'react';
import styles from '../styles/Home.module.css';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { SearchRounded } from '@material-ui/icons';
import Header from '../components/header';
import Image from 'next/image';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [movieList, setMovieList] = useState([])

  const handleClick = async () => {
    if (searchText !== '') {
      const result = await fetch(`http://localhost:3000/api/search?q=${searchText}`)
      const json = await result.json()
      setMovieList(json.list)
    }
  }


  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleClick();
    }
  }
  
  return (
      <div>
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
                  <li key={item.title} className={styles.moviecard}>
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