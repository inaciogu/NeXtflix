import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { apiBase, apiKey } from '../../lib/tmdb';
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
      <Head>
        <title>{info.title}</title>
      </Head>
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
          <p>Gênero: {`${info.genres[0].name}`}</p>
          <p>Data de lançamento: {info.release_date}</p>
          <p>Nota: {info.vote_average}</p>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const getId = context.params.id
  const result = await fetch(`${apiBase}/movie/${getId}?api_key=${apiKey}&language=pt-BR`)
  const json = await result.json();
  return {
    props: {
      info: json,
    }
  }
}