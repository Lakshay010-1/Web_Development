import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import styles from './styles/PageNav.module.css'

export default function PageNav() {
    return (
        <div className={styles.navContainer}>
            <Logo />
            <div>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/map">Map</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
        </div>
    )
}
