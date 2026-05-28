import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import styles from './styles/PlaceForm.module.css'
import Button from './Button';
import Loader from './Loader';
import { usePlacesContext } from '../contexts/usePlacesContext';

export default function PlaceForm() {
    const [place, setPlace] = useState({ error: false, isLoading: false, cityName: "", country: "", countryCode: "", date: "", notes: "", position: { lat: "", lng: "" }, status: "", id: "" });
    const navigate = useNavigate();
    const [latlng] = useSearchParams();
    const { createPlace, isPlaceLoading } = usePlacesContext();
    let lat = latlng.get("lat");
    let lng = latlng.get("lng");

    const BASE_URL_PLACE = "https://api.bigdatacloud.net/data/reverse-geocode-client";
    async function handleSubmit(e) {
        e.preventDefault();
        if (!place.date || !place.cityName || !place.notes || !place.status) {
            return;
        }
        console.log("Form submitted.")

        const placeInfo = {
            cityName: place.cityName,
            country: place.country,
            countryCode: place.countryCode,
            date: place.date,
            notes: place.notes,
            position: {
                lat: place.position.lat,
                lng: place.position.lng
            },
            status: place.status
        }
        await createPlace(placeInfo);
        navigate("/map/all");

    }

    function handlePlaceInfoChange(e) {
        const key = e.target.name, value = e.target.value;
        setPlace(prev => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    useEffect(() => {
        async function fetchData() {
            setPlace(prev => { return { ...prev, isLoading: true, error: false } })
            try {

                const response = await fetch(`${BASE_URL_PLACE}?latitude=${lat}&longitude=${lng}`);
                const data = await response.json();
                const { city, countryCode, countryName, latitude, longitude, status } = data;
                if (!countryCode) {
                    return setPlace(prev => { return { ...prev, error: true } });
                }
                setPlace(prev => {
                    return {
                        ...prev,
                        cityName: city,
                        country: countryName,
                        countryCode,
                        position: {
                            lat: latitude,
                            lng: longitude
                        },
                        status,
                        id: Date.now()
                    }
                })
            } catch (err) {
                console.error("Error fetching place info, ", err)
            } finally {
                setPlace(prev => { return { ...prev, isLoading: false } })
            }
        }
        fetchData();
    }, [lat, lng]);

    return (
        <>
            {
                place.isLoading
                    ?
                    <Loader />
                    :
                    (place.error || !lat || !lng)
                        ?
                        <p>Click somewhere else.<br />This doesn't seem to be a place inside any country.</p>
                        :
                        <form className={`${styles.form} ${(place.isLoading || isPlaceLoading) ? styles.loading : ""}`} onSubmit={handleSubmit}>

                            <div className={styles.row}>
                                <label htmlFor='cityName'>Place:</label>
                                <input id="cityName" className={styles.cityName} name="cityName" onChange={(e) => handlePlaceInfoChange(e)} value={place.cityName} placeholder="Place Name" required />
                                <img className={styles.flag} src={`https://flagpedia.net/data/flags/w1160/${place.countryCode.toLowerCase()}.webp`} />
                            </div>

                            <div className={styles.row}>
                                <label htmlFor='date'>When did you visit {place.cityName}, {place.country}?</label>
                                <DatePicker id="date" placeholderText='ZZ/YY/XXXX' onChange={(date) => setPlace(prev => { return { ...prev, date: date } })} selected={place.date} dateFormat="dd/MM/yyyy" required />
                            </div>

                            <div className={styles.row}>
                                <label htmlFor='status'>Status : {place.cityName}, {place.country}?</label>
                                <select placeholder="" id="status" value={place.status} onChange={(e) => setPlace(prev => { return { ...prev, status: e.target.value } })} required>
                                    <option selected disabled value="">Select Status : Visited/To Visit</option>
                                    <option value="visited">Visited</option>
                                    <option value="tovisit">To Visit</option>
                                </select>
                            </div>

                            <div className={styles.row}>
                                <label htmlFor="notes">Describe Your {place.cityName}, {place.country} Trip Experience</label>
                                <textarea
                                    id="notes"
                                    placeholder='Experience'
                                    name='notes'
                                    onChange={(e) => handlePlaceInfoChange(e)}
                                    value={place.notes}
                                    required
                                />
                            </div>

                            <div className={styles.buttons}>
                                <Button
                                    type="back"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(-1);
                                    }}
                                >
                                    &larr; Back
                                </Button>
                                <Button type="primary">Add</Button>
                            </div>

                        </form>
            }
        </>
    )
}
