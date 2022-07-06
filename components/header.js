import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Header() {
  useEffect(() => {
    handleColor();
  }, [])

  function handleColor() {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      let windowPos = window.scrollY > 100
      if (windowPos) {
        header.style.backgroundColor = 'black';
      } else {
        header.style.backgroundColor = 'transparent'
      }
    })
  }

  return (
    <header onScroll={ handleColor } className={styles.header}>
      <Link href="/" passHref>
        <h1>Nextflix</h1>
      </Link>
      <Link href="/" passHref><h4>Inicio</h4></Link>
      <Link href="/search" passHref><h4>Buscar</h4></Link>
      <Link href="/genres" passHref><h4>Gêneros</h4></Link>
    </header>
  )}
