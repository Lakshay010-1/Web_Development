import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../pages/Home'
import styles from './styles/Logo.module.css'

export default function Logo() {
    return (
        <Link to="/" element={<Home />} className={styles.logoContainer}>
            <img src="images/logo.png" />
            <h1>PIN PLANET</h1>
        </Link>
    )
}
