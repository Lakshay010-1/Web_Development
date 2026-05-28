import React from 'react'
import PageNav from '../components/PageNav'
import styles from './styles/Login.module.css'
import LoginForm from '../components/LoginForm';

export default function Login() {
    return (
        <div className='container'>

            <main className={styles.authenticate}>
                <PageNav />
                <section>
                    <LoginForm />
                </section>
            </main>
        </div>
    )
}
