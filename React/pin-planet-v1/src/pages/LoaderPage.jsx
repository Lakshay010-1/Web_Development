import React from 'react'
import Loader from '../components/Loader'
import styles from './styles/LoaderPage.module.css'

export default function LoaderPage() {
    return <div className={styles.container}>
        <Loader />
    </div>
}
