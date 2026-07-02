import React, { useReducer } from 'react'
import styles from './styles/PlaceCards.module.css'
import PlaceCard from './PlaceCard'

function countryReducer(state, action) {
    switch (action.type) {
        case "update/places":
            return { ...state, currentCountry: action.payload, currentPlaces: action.payload === "All" ? state.places : state.places.filter(place => place.country === action.payload) }
        default:
            return state;
    }
}

export default function PlaceCards({ places, title, countries }) {
    const sortedPlaces = places.sort((a, b) => new Date(b.date) - new Date(a.date));

    const countryInitialState = {
        places: sortedPlaces,
        currentCountry: "All",
        currentPlaces: places
    }

    const [currentState, countryDispatch] = useReducer(countryReducer, countryInitialState);

    function handleCountryChange(country) {
        countryDispatch({ type: "update/places", payload: country })
    }

    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <div className={styles.navPlacesCountries}>
                {countries.map((country, idx) => <div key={idx} onClick={() => handleCountryChange(country)} className={`${styles.navPlacesItem} ${currentState.currentCountry === country && styles.activeNavPlacesItem}`}>{country}</div>)}
            </div>
            <div className={styles.cardsContainer}>
                {
                    places.length === 0 ?
                        <h3>No {title} Yet</h3>
                        :
                        currentState.currentPlaces.map(place => <PlaceCard key={place._id} place={place} />)
                }
            </div>
        </div>
    )
}