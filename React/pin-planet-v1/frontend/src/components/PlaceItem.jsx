import React from 'react'
import styles from './styles/PlaceItem.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { usePlacesContext } from '../contexts/usePlacesContext';
import EditIcon from '@mui/icons-material/Edit';

const formatDate = (date) => {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}


export default function PlaceItem(props) {
    const { currentPlace, deletePlace } = usePlacesContext();
    const navigate = useNavigate();
    const placeStatus = (props.place.status === "tovisit" && new Date(props.place.date) < new Date()) ? "missed" : props.place.status;
    function handleClick(e) {
        e.preventDefault();
        if (e.target.name === "delete") {
            deletePlace(props.place._id);
        } else {
            navigate(`/map/form/patch/${props.place._id}`);
        }
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
                    <Link className={`${styles.placeItem} ${props.place._id == currentPlace._id && styles["placeItem--active"]} ${styles[placeStatus]}`} to={`/map/all/${props.place._id}?lat=${props.place.position.lat}&lng=${props.place.position.lng}`}>
                        <div>
                            <img src={`https://flagpedia.net/data/flags/w1160/${props.place.countryCode.toLowerCase()}.webp`} />
                            <div>
                                <p>{props.place.cityName},</p>
                                <p>{props.place.country}</p>
                                <p>{formatDate(props.place.date || null)}</p>
                            </div>
                        </div>
                        <div>
                            <button name="update" onClick={e => handleClick(e)} className={styles.deleteBtn}>&#9999;</button>
                            <button name="delete" onClick={(e) => handleClick(e)} className={styles.deleteBtn}>X</button>
                        </div>
                    </Link>
            }
        </li>
    )
}