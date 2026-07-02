import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlacesContext } from '../contexts/usePlacesContext';
import Loader from './Loader';
import styles from './styles/Place.module.css'
import Button from './Button';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));


function formatCoordinate(value, type) {
    const direction =
        type === "lat"
            ? value >= 0
                ? "N"
                : "S"
            : value >= 0
                ? "E"
                : "W";

    return `${Math.abs(value).toFixed(6)}° ${direction}`;
}



export default function Place() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPlace, currentPlace, deletePlace, isPlaceLoading: isLoading } = usePlacesContext();
    const [operationMessage, setOperationMsg] = useState("");
    const [secondsToRedirect, setSecondsToRedirect] = useState(10);

    useEffect(() => {
        getPlace(id);
    }, [id, getPlace]);

    const { cityName: placeName, country, date, notes, status, position } = currentPlace;

    const operationBtn = {
        fontSize: 48
    };

    function startCountdown(duration = 10) {
        setSecondsToRedirect(duration);
        const interval = setInterval(() => {
            setSecondsToRedirect((prev) => {
                if (prev < 1) {
                    clearInterval(interval);
                    navigate("/map/all");
                    return prev;
                }
                return prev - 1;
            });
        }, 1000);
    }

    async function handleDeleteClick(e) {
        e.preventDefault();
        setOperationMsg("Place Deleted Successfully.");
        await deletePlace(id);
        startCountdown();
    }

    async function handleUpdateClick(e) {
        e.preventDefault();
        navigate(`/map/form/patch/${id}`);

    }

    return (
        <>
            {
                isLoading ?
                    <Loader />
                    :
                    (currentPlace._id === undefined) ?
                        <div className={styles.messageContainer}>
                            <h1>{operationMessage}</h1>
                            <h4>Returning to the All Places page in {secondsToRedirect} seconds.</h4>
                        </div>
                        :
                        <div className={styles.city}>
                            <div className={styles.row}>
                                <h6>Place</h6>
                                <a
                                    href={`https://en.wikipedia.org/wiki/${placeName}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {placeName}, {country}
                                </a>
                            </div>

                            <div className={styles.row}>
                                <h6>{status === "visited" ? "Went" : new Date(date) < new Date() ? "Missed Trip" : "Trip"} to {placeName} on</h6>
                                <p>{formatDate(date || null)}</p>
                            </div>

                            {notes && (
                                <div className={`${styles.row} ${styles.placeNote}`}>
                                    <h6>Note</h6>
                                    <p>{notes}</p>
                                </div>
                            )}

                            <div className={styles.row}>
                                <h6>Coordinates</h6>
                                {
                                    position &&
                                    <p>{formatCoordinate(Number(position.lat), "lat")}, {formatCoordinate(Number(position.lng), "lng")}</p>
                                }
                            </div>

                            <div className={styles.operationsRow}>

                                <div className={styles.button}>
                                    <Button
                                        type="back"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(-1);
                                        }}
                                    >
                                        Back
                                    </Button>
                                </div>
                                <div className={styles.operationsBtnsRow}>
                                    <a className={styles.operationBtn} onClick={(e) => { handleDeleteClick(e) }}>
                                        <HighlightOffIcon sx={{
                                            ...operationBtn,
                                            color: "var(--color-brand-13)",
                                            "&:hover": {
                                                color: "var(--color-brand-6)",
                                            },
                                        }} />
                                    </a>
                                    <a className={styles.operationBtn} onClick={(e) => { handleUpdateClick(e) }}>
                                        <EditIcon sx={{
                                            ...operationBtn,
                                            color: "var(--text-color-1-3)",
                                            "&:hover": {
                                                color: "var(--text-color-1-6)",
                                            },
                                        }} />
                                    </a>
                                </div>
                            </div>
                        </div >
            }
        </>
    );
}
