import React from 'react'
import styles from './styles/PlacesNav.module.css'
import { NavLink } from 'react-router-dom'

export default function PlacesNav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="all">All</NavLink>
                </li>
                <li>
                    <NavLink to="visited">Visited</NavLink>
                </li>
                <li>
                    <NavLink to="tovisit">To Visit</NavLink>
                </li>
            </ul>
        </nav>
    )
}
