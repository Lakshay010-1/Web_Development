import React from 'react'
import styles from './styles/Dashboard.module.css'
import PageNav from '../components/PageNav'
import Login from './Login';
import { useAuthContext } from '../contexts/useAuthContext';
import { Link, NavLink, Outlet } from 'react-router-dom';
import PlaceCard from '../components/PlaceCard';
import PlaceCards from '../components/PlaceCards';
import { usePlacesContext } from '../contexts/usePlacesContext';
import { formatDistanceToNow } from "date-fns";

function calculateTimeDiff(timeModified) {
    const res = formatDistanceToNow(new Date(timeModified), {
        addSuffix: true,
    });
    return res;
}

function uniqueCountries(places_list, places_status) {
    return [...new Set(places_list.map(place => place.country))]
}

function recentActivity(places) {
    const acitivities = [];
    places.forEach(place => {
        acitivities.push({
            id: place._id,
            position: place.position,
            action: "Added",
            placeName: `${place.cityName}, ${place.country}`,
            date: place.createdAt
        });
        if (place.createdAt !== place.updatedAt) {
            acitivities.push({
                id: place._id,
                position: place.position,
                action: "Updated",
                placeName: `${place.cityName}, ${place.country}`,
                date: place.updatedAt
            });
        }
    });
    return acitivities.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function Dashboard() {

    const { user, isAuthenticated, logout } = useAuthContext();
    const { places } = usePlacesContext();
    const visistedPlaces = places.filter(place => place.status == "visited")
    const toVisistPlaces = places.filter(place => place.status == "tovisit" && new Date(place.date) >= new Date())
    const missedToVisistPlaces = places.filter(place => place.status == "tovisit" && new Date(place.date) < new Date())
    return (
        <div className='container'>
            {isAuthenticated
                &&
                <main className={styles.dashboard}>
                    <PageNav />

                    <section >
                        <div className={styles.dashboardHeader}>
                            <h1 className={styles.mainTitle}>Dashboard</h1>
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
                            <ul>
                                <li>
                                    <h2>Travel Completion Rate: {((visistedPlaces.length / places.length) * 100).toFixed(1)}%</h2>
                                </li>
                                <li>
                                    <h2>Total Pinned Places: <span>{places.length}</span></h2>
                                    <ul>
                                        <li className={styles.pinnedStats}>
                                            <h3></h3>
                                            <h3>Places</h3>
                                            <h3>Countries</h3>
                                            <h3 className={styles.tableBasis}>Visited</h3>
                                            <h3>{visistedPlaces.length}</h3>
                                            <h3>{uniqueCountries(visistedPlaces, "visited").length}</h3>
                                            <h3 className={styles.tableBasis}>To-Visit</h3>
                                            <h3>{toVisistPlaces.length}</h3>
                                            <h3>{uniqueCountries(toVisistPlaces, "tovisit").length}</h3>
                                            <h3 className={styles.tableBasis}>Missed</h3>
                                            <h3>{missedToVisistPlaces.length}</h3>
                                            <h3>{uniqueCountries(missedToVisistPlaces, "missed").length}</h3>
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
                        <div>
                            <PlaceCards places={missedToVisistPlaces} title="Missed To-Visit Places" countries={["All", ...uniqueCountries(missedToVisistPlaces)]} />
                        </div>

                        <div>
                            <h1>Recent Activity</h1>
                            <div className={styles.recentActivityContainer}>
                                {recentActivity(places).map(activity =>
                                    <Link key={activity.id + activity.date} className={styles.userActivity} to={`/map/all/${activity.id}?lat=${activity.position.lat}&lng=${activity.position.lng}`}>
                                        <span>{activity.action}</span> <span>{activity.placeName}</span><span>{calculateTimeDiff(activity.date)}</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                    </section>
                </main>
            }
        </div>
    )
}