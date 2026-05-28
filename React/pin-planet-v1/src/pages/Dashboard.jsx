import React from 'react'
import styles from './styles/Dashboard.module.css'
import PageNav from '../components/PageNav'
import Login from './Login';
import { useAuthContext } from '../contexts/useAuthContext';
import { NavLink, Outlet } from 'react-router-dom';
import PlaceCard from '../components/PlaceCard';
import PlaceCards from '../components/PlaceCards';
import { usePlacesContext } from '../contexts/usePlacesContext';

export default function Dashboard() {

    function uniqueCountries(places_list) {
        console.log(places_list)
        return [...new Set(places_list.map(place => place.country))]
    }

    const { user, isAuthenticated, logout } = useAuthContext();
    const { places } = usePlacesContext();
    console.log(places)
    const visistedPlaces = places.filter(place => place.status == "visited")
    const toVisistPlaces = places.filter(place => place.status == "tovisit")
    return (
        <div className='container'>
            {isAuthenticated
                &&
                <main className={styles.dashboard}>
                    <PageNav />

                    <section >
                        <div className={styles.dashboardHeader}>
                            <h1>Dashboard</h1>
                            <div className={styles.profileContainer}>
                                <div>
                                    <div>
                                        <h1>{user.name}</h1>
                                        <button onClick={() => logout()}>Logout</button>
                                    </div>
                                    <img src={user.profilePic} alt="profile pic" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1>Overview</h1>
                            <h2>Total Pinned Places: <span>{places.length}</span></h2>
                            <ul className={styles.pinnedStats}>
                                <li>
                                    <h3>Visited:</h3>
                                    <ul>
                                        <li>
                                            Visited Places : <span>{visistedPlaces.length}</span>
                                        </li>
                                        <li>
                                            Visited Countries : <span>{uniqueCountries(visistedPlaces).length}</span>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <h3>To-Visit:</h3>
                                    <ul>
                                        <li>
                                            To-Visit Places : <span>{toVisistPlaces.length}</span>
                                        </li>
                                        <li>
                                            To-Visit Countries : <span>{uniqueCountries(toVisistPlaces).length}</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <PlaceCards places={visistedPlaces} title="Visited Places" countries={["All", ...uniqueCountries(visistedPlaces)]} />
                        </div>

                        <div>
                            <PlaceCards places={toVisistPlaces} title="To-Visit Places" countries={["All", ...uniqueCountries(toVisistPlaces)]} />
                        </div>

                    </section>
                </main>
            }
        </div>
    )
}