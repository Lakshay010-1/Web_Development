import React from 'react'
import styles from './styles/PlacesList.module.css'
import Loader from './Loader'
import PlaceItem from './PlaceItem'
import { usePlacesContext } from '../contexts/usePlacesContext'

export default function PlacesList({ tab }) {
    const { places, placesLoading: isLoading } = usePlacesContext()
    let filteredPlaces = [];

    // Needs correction
    function countVisits(country, visitStatus) {
        return places.filter(p => p.country === country && p.status === visitStatus).length;
    }

    switch (tab) {
        // Countries
        case "countries":
            filteredPlaces = [...new Map(places.map(place => [place.country, place])).values()]
            break;

        // To Visit
        case "tovisit":
            filteredPlaces = places.filter(p => p.status == "tovisit")
            break;

        // Visited
        case "visited":
            filteredPlaces = places.filter(p => p.status == "visited")
            break;

        // All Cities 
        default:
            filteredPlaces = places;
            break;
    }

    return (
        <div className={styles.placeListContainer}>
            <ul className={styles.placeList}>
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        filteredPlaces.length
                            ?
                            filteredPlaces.map((place) => <PlaceItem key={place.id} place={place} tab={tab} countVisits={countVisits} />)
                            :
                            <p className={styles.message}>Add your first place by clicking on the map</p>
                }
            </ul>
        </div>
    )
}
