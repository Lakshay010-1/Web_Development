import React from 'react'
import styles from './styles/PlaceCard.module.css'
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";

function calculateTimeDiff(timeModified) {
    const res = formatDistanceToNow(new Date(timeModified), {
        addSuffix: true,
    });
    return res;
}

export default function PlaceCard({ place }) {
    const { _id: id, cityName, position, country, countryCode, date, notes, updatedAt, createdAt, status } = place;
    const formatDate = (date) => {
        return new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));
    }

    const placeStatus = status === "tovisit" && new Date(date) < new Date() ? "missedvisit" : status;

    return (
        <Link to={`/map/all/${id}?lat=${position.lat}&lng=${position.lng}`}>
            <div className={`${styles.card} ${styles[placeStatus]}`}>
                <div className={styles.flagContainer}>
                    <img className={styles.placeFlag} src={`https://flagpedia.net/data/flags/w1160/${countryCode.toLowerCase()}.webp`} />
                </div>
                <div className={styles.placeName}>
                    <p className={styles.cityName}>{cityName},</p>
                    <p className={styles.countryName}>{country}</p>
                </div>
                <p className={styles.placeNote}>{`${notes.substring(0, 50)} ${notes.length > 50 ? "..." : ""}`}</p>
                <div className={styles.placeDate}>
                    <p >{placeStatus === "visited" ? "Visited" : placeStatus === "tovisit" ? "Fun Trip in" : "Missed"} {calculateTimeDiff(date)}</p>
                    <p>({formatDate(date)})</p>
                </div>
                <p>{`${createdAt === updatedAt ? "Added" : "Updated"} ${calculateTimeDiff(updatedAt)}`}</p>
            </div>
        </Link>
    )
}
