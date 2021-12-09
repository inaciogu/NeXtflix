import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Header from '../components/header';
import { useEffect } from 'react';

export default function Home({ list }) {
  useEffect(() => {
    Aos.init({
      duration: '1000',
    });
  }, [])
  return (
    <div>
      <Head>
        <title>NeXtflix</title>
      </Head>
      <Header />
        <main className={styles.main}>
          <h2>Filmes em destaque</h2>
            <ul className={styles.movielist}>
              {list.map(item => (
                <li data-aos="fade-up" className={styles.moviecard} key={item.title}>
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