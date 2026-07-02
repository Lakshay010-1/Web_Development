import React from 'react'
import PageNav from '../components/PageNav'
import styles from './styles/Login.module.css'
import AuthForm from '../components/AuthForm';

export default function Login() {
    return (
        <div className='container'>

            <main className={styles.authenticate}>
                <PageNav />
                <section>
                    <AuthForm />
                </section>
            </main>
        </div>
    )
}
