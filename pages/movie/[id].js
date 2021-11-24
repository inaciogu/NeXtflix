import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import { useEffect } from 'react';
import Header from '../../components/header';

export default function MovieItem({ info }) {

  useEffect(() => {
    document.body.style.background = `url(http://image.tmdb.org/t/p/original${info.backdrop_path})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.position = 'relative';
    const main = document.querySelector('main');
    main.style.background = 'rgb(255, 255, 255, 0.5)'
    return function cleanUp() {
      document.body.style.backgroundImage = '';
    }
  })

  return (
    <div className={styles.content}>
      <Header />
      <main className={styles.main}>
        <div className={styles.movieinfo}>
          <h1 className={styles.title}>
          {info.title}
          </h1>
          <img width="400" src={`http://image.tmdb.org/t/p/original${info.backdrop_path}`} />
          <p className={styles.overview}>
            {info.overview}
          </p>
          <p>Gêneros: {`${info.genres[0].name}, ${info.genres[1].name}`}</p>
          <p>Data de lançamento: {info.release_date}</p>
          <p>Nota: {info.vote_average}</p>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const getId = context.params.id
  const res = await fetch(`http://localhost:3000/api/movie/${getId}`)
  const json = await res.json();
  return {
    props: {
      info: json.info,
    }
  }
}