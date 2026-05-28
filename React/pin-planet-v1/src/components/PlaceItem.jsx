import React from 'react'
import styles from './styles/PlaceItem.module.css'
import { Link } from 'react-router-dom';
import { usePlacesContext } from '../contexts/usePlacesContext';

const formatDate = (date) => {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}


export default function PlaceItem(props) {
    const { currentPlace, deletePlace } = usePlacesContext();
    function handleClick(e) {
        e.preventDefault();
        deletePlace(props.place.id);
    }
    return (
        <li>

            {
                props.tab === "countries"
                    ?
                    <div>
                        <img src={`https://flagpedia.net/data/flags/w1160/${props.place.countryCode.toLowerCase()}.webp`} />
                        <div>
                            <p>Visited : {props.countVisits(props.place.country, "visited")} times</p>
                            <p>Upcoming : {props.countVisits(props.place.country, "tovisit")} planned trips</p>
                        </div>
                    </div>
                    :
                    <Link className={`${styles.placeItem} ${props.place.id == currentPlace.id && styles["placeItem--active"]}`} to={`/map/all/${props.place.id}?lat=${props.place.position.lat}&lng=${props.place.position.lng}`}>
                        <div>
                            <img src={`https://flagpedia.net/data/flags/w1160/${props.place.countryCode.toLowerCase()}.webp`} />
                            <div>
                                <p>{props.place.cityName},</p>
                                <p>{props.place.country}</p>
                                <p>{formatDate(props.place.date || null)}</p>
                            </div>
                        </div>
                        <button onClick={(e) => handleClick(e)} className={styles.deleteBtn}>X</button>
                    </Link>
            }
        </li>
    )
}
