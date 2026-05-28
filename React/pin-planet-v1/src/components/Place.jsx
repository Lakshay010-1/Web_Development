import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlacesContext } from '../contexts/usePlacesContext';
import Loader from './Loader';
import styles from './styles/Place.module.css'
import Button from './Button';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));


export default function Place() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPlace, currentPlace, isPlaceLoading: isLoading } = usePlacesContext();

    useEffect(() => {
        getPlace(id);
    }, [id, getPlace]);

    const { cityName: placeName, country, date, notes } = currentPlace;
    return (
        <>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className={styles.city}>
                        <div className={styles.row}>
                            <h6>City name</h6>
                            <p>
                                {placeName}, {country}
                            </p>
                        </div>

                        <div className={styles.row}>
                            <h6>You went to {placeName} on</h6>
                            <p>{formatDate(date || null)}</p>
                        </div>

                        {notes && (
                            <div className={styles.row}>
                                <h6>Your notes</h6>
                                <p>{notes}</p>
                            </div>
                        )}

                        <div className={styles.row}>
                            <h6>Learn more</h6>
                            <p>
                                <a
                                    href={`https://en.wikipedia.org/wiki/${placeName}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Check out {placeName} on Wikipedia &rarr;
                                </a>
                            </p>
                        </div>

                        <div className={styles.button}>
                            <Button
                                type="back"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(-1);
                                }}
                            >
                                &larr; Back
                            </Button>
                        </div>
                    </div>
            }
        </>
    );
}
