import React from 'react';
import Header from '../components/header';
import styles from '../styles/Home.module.css';

export default function genres({ list }) {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <ul className={styles.genrelist}>
            {list.map(item => (
              <li className={styles.genrecard} key={ item.id }>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
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