import React from 'react'
import styles from './styles/PageNotFound.module.css'
import PageNav from '../components/PageNav'

export default function PageNotFound() {
    return (
        <div className="container">
            <main className={styles.notFound}>
                <PageNav />
                <section>
                    <h1>Error 404: Page Not Found</h1>
                </section>
            </main>
        </div>
    )
}
