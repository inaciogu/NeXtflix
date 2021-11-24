import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import Header from '../components/header';

export default function Home({ list }) {
  const [color, setColor] = useState('');

  return (
    <div>
      <Header style={color} />
        <main className={styles.main}>
          <h2>Filmes em destaque</h2>
            <ul className={styles.movielist}>
              {list.map(item => (
                <li className={styles.moviecard} key={item.title}>
                    <a href={`/movie/${item.id}`}>
                      <img width="200" height="300" src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title} />
                      <br />
                      <p>{item.title}</p>
                    </a>
                </li>
              ))}
            </ul>
        </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/trending')
  const json = await res.json();
  return {
    props: {
      list: json.list, 
    }
  }
}