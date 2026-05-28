import React from 'react'
import styles from './styles/PlaceCard.module.css'
import { Link } from 'react-router-dom';

export default function PlaceCard({ id, cityName, country, date, notes, position, status, countryCode }) {
    console.log(status);
    const formatDate = (date) => {
        return new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));
    }

    return (
        <Link to={`/map/all/${id}?lat=${position.lat}&lng=${position.lng}`}>
            <div className={`${styles.card} ${styles[status]}`}>
                <div>
                    <div>
                        <img className={styles.countryFlag} src={`https://flagpedia.net/data/flags/w1160/${countryCode.toLowerCase()}.webp`} />
                        <div>
                            <p className={styles.cityName}>{cityName},</p>
                            <p className={styles.countryName}>{country}</p>
                            <p className={styles.date}>{formatDate(date)}</p>
                            <p className={styles.status}>{status}</p>
                        </div>
                    </div>
                    <p className={styles.placeNote}>{`${notes.substring(0, 500)}${notes.length > 500 && "..."}`}</p>
                </div>
                <p className={styles.placeCoordinates}>{position.lat}, {position.lng}</p>
            </div>
        </Link>
    )
}
