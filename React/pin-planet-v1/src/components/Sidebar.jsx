import React from 'react'
import styles from './styles/Sidebar.module.css'
import PlacesNav from './PlacesNav'
import { Outlet } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div>
                <PlacesNav />
                <Outlet />
            </div>
            <footer className={styles.footer}>
                <p className={styles.copyrightInfo}>
                    &copy; Copyright {new Date().getFullYear()} by Lakshay Goyal
                </p>
            </footer>
        </div>
    )
}
