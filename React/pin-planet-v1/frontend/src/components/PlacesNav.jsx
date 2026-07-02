import React from 'react'
import styles from './styles/PlacesNav.module.css'
import { NavLink } from 'react-router-dom'

export default function PlacesNav() {
    return (
        <nav className={styles.nav}>
                <NavLink to="all">All</NavLink>
                <NavLink to="visited">Visited</NavLink>
                <NavLink to="tovisit">To Visit</NavLink>
        </nav>
    )
}
