import React from 'react'
import PageNav from '../components/PageNav'
import styles from "./styles/About.module.css"

export default function about() {
  return (
    <div className='container'>
      <main className={styles.aboutContent}>
        <PageNav />
        <section className={styles.about}>
          <header className={styles.aboutHeader}>
            <h1>About Us</h1>
            <h2 className={styles.aboutIntro}>Built to make place tracking simple and reliable.</h2>
          </header>

          <div className={styles.aboutBody}>
            <h2>Places often get scattered across multiple tools—notes apps, screenshots, bookmarks, and conversations—making them difficult to retrieve when needed.</h2>
            <h2>Whether it is a café you discovered, a place someone recommended, or a destination you plan to visit, these locations are easy to lose over time.</h2>
            <h2>This platform is designed to address that problem in a simple and structured way.</h2>
            <h2><strong>Pin Planet</strong> provides a dedicated space to save and organize places that matter to you.</h2>
            <h2>It functions as a personal map that evolves with your experiences and future plans.</h2>
          </div>

          <footer className={styles.aboutFooter}>
            <h2><strong>Your places. Your memory. Your map.</strong></h2>
          </footer>
        </section>
      </main>
    </div>
  )
}
