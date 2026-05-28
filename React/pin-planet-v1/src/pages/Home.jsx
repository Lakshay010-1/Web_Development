import React from 'react'
import PageNav from '../components/PageNav'
import styles from "./styles/Home.module.css"
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='container'>
      <main className={styles.homepage}>
        <PageNav />
        <section>
          <h1>
            Keep track of places that matter.
          </h1>
          <h1>

            From places you’ve been, to places you’re planning <br /> save, organize, and revisit everything on your personal map.
          </h1>
          <h2>
            Not every place needs a full travel story. Sometimes you just want to remember that café, that trip, or that spot someone recommended.
            This is where it all lives—simple, organized, and easy to come back to.
          </h2>
          <Link to="/map" className="ctaBtn">
            Get Started
          </Link>
        </section>
      </main>
    </div>
  )
}
