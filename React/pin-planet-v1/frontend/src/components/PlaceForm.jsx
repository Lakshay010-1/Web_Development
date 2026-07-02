import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './styles/PlaceForm.module.css'
import Button from './Button';
import Loader from './Loader';
import { usePlacesContext } from '../contexts/usePlacesContext';

const PLACE_COORDS_INFO_BASE_URL_PLACE = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const initialState = { error: false, isLoading: false, cityName: "", country: "", countryCode: "", date: "", notes: "", position: { lat: "", lng: "" }, status: "", id: "" };

export default function PlaceForm() {
    const { createPlace, getPlace, updatePlace, currentPlace, isPlaceLoading } = usePlacesContext();
    const [place, setPlace] = useState(initialState);
    const navigate = useNavigate();
    const { id: placeIdToUpdate } = useParams();
    const [latlng] = useSearchParams();
    let lat = latlng.get("lat");
    let lng = latlng.get("lng");
    const currentOperation = (placeIdToUpdate !== undefined) ? "update" : (lat && lng) ? "add" : "";

    async function handleSubmit(e) {
        e.preventDefault();
        if (!place.date || !place.cityName || !place.notes || !place.status) {
            return;
        }

        const placeInfo_1 = {
            cityName: place.cityName,
            date: place.date,
            notes: place.notes,
            status: place.status
        }
        const placeInfo_2 = {
            country: place.country,
            countryCode: place.countryCode,
            position: {
                lat: place.position.lat,
                lng: place.position.lng
            }
        };
        if (currentOperation == "update") {
            await updatePlace({ ...placeInfo_1, _id: placeIdToUpdate });
            navigate(`/map/all/${placeIdToUpdate}?lat=${placeInfo_2.position.lat}&lng=${placeInfo_2.position.lng}`);
        } else if (currentOperation == "add") {
            await createPlace({ ...placeInfo_1, ...placeInfo_2 });
            navigate("/map/all");
        }

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
            if (currentOperation == "add") {
                try {
                    setPlace(prev => { return { ...prev, isLoading: true, error: false } })
                    const response = await fetch(`${PLACE_COORDS_INFO_BASE_URL_PLACE}?latitude=${lat}&longitude=${lng}`);
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
                            status: status === undefined ? "" : status,
                        }
                    })
                } catch (err) {
                    console.error("Error fetching place info, ", err)
                } finally {
                    setPlace(prev => { return { ...prev, isLoading: false } })
                }
            } else if (currentOperation === "update") {
                await getPlace(placeIdToUpdate);
                setPlace(currentPlace);
            } else {
                navigate("/map/all");
            }
        }
        fetchData();
    }, [currentOperation, lat, lng, placeIdToUpdate]);

    return (
        <div className={styles.formContainer}>
            {
                place.isLoading
                    ?
                    <Loader />
                    :
                    (currentOperation !== "update" && (place.error || !lat || !lng))
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
                                <select id="status" value={place.status} onChange={(e) => setPlace(prev => { return { ...prev, status: e.target.value } })} required>
                                    <option value="" disabled>Select Status : Visited/To Visit</option>
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
                                <Button type="primary">{currentOperation === "update" ? "Update" : "Add"}</Button>
                            </div>

                        </form>
            }
        </div>
    )
}
