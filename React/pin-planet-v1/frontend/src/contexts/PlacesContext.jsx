import React, { useEffect, createContext, useReducer, useCallback, } from "react";
import { useAuthContext } from "./useAuthContext";
import { addPlace, fetchPlace, fetchPlaces, modifyPlace, removePlace } from "../api/placeAPI";

const PlacesContext = createContext();

const initialState = {
    places: [],
    currentPlace: {},
    isPlaceLoading: false,
};

function placesReducer(state, action) {
    switch (action.type) {
        case "places/loading":
            return { ...state, isPlaceLoading: action.payload, };
        case "place/create":
            return { ...state, places: [...state.places, action.payload], currentPlace: action.payload, };
        case "place/delete":
            return { ...state, places: state.places.filter((place) => place._id !== action.payload), currentPlace: {}, };
        case "place/update":
            return { ...state, places: [...state.places.filter((place) => place._id !== action.payload._id), action.payload], currentPlace: action.payload };
        case "place/load":
            return { ...state, currentPlace: action.payload, };
        case "places/load":
            return { ...state, places: action.payload, };
        default:
            throw new Error("Unknown action type");
    }
}


function PlacesProvider({ children }) {
    const { user } = useAuthContext();
    const [{ places, currentPlace, isPlaceLoading }, placesDispatch] = useReducer(placesReducer, initialState);

    // Load places
    useEffect(() => {
        async function loadPlaces() {
            if (user !== null) {
                try {
                    placesDispatch({ type: "places/loading", payload: true });
                    const response = await fetchPlaces(user.email);
                    let places;
                    if (response.error) {
                        places = [];
                    }
                    places = response.places;
                    placesDispatch({ type: "places/load", payload: places, });
                } catch (error) {
                    console.error("Error loading places:", error);
                } finally {
                    placesDispatch({ type: "places/loading", payload: false });
                }
            }
        }
        loadPlaces();
    }, [user]);

    // Get single place
    const getPlace = useCallback(
        async function (id) {
            if (id == currentPlace._id) return;

            try {
                placesDispatch({ type: "places/loading", payload: true });

                const response = await fetchPlace(id);
                if (!response.error) {
                    const place = response.place;
                    placesDispatch({ type: "place/load", payload: place });
                }
            } catch (error) {
                console.error("Error getting place:", error);
            } finally {
                placesDispatch({ type: "places/loading", payload: false });
            }
        },
        [currentPlace._id]
    );

    // Create new place
    async function createPlace(place) {
        const newPlace = {
            ...place,
            user: user.email
        };

        try {
            placesDispatch({ type: "places/loading", payload: true });

            const response = await addPlace(newPlace);
            if (!response.error) {
                const place = response.place;
                placesDispatch({ type: "place/create", payload: place });
            }
        } catch (error) {
            console.error("Error creating place:", error);
        } finally {
            placesDispatch({ type: "places/loading", payload: false });
        }
    }

    async function updatePlace(place) {
        const oldPlace = place;
        try {
            placesDispatch({ type: "places/loading", payload: true });
            const response = await modifyPlace(oldPlace);
            const updatedPlace = response.place;
            if (!response.error && updatedPlace) {
                placesDispatch({ type: "place/update", payload: updatedPlace });
            }
        } catch (error) {
            console.error("Error creating place:", error);
        } finally {
            placesDispatch({ type: "places/loading", payload: false });
        }
    }

    // Delete place
    async function deletePlace(id) {
        try {
            placesDispatch({ type: "places/loading", payload: true });
            const response = await removePlace(id);
            if (!response.error) {
                placesDispatch({ type: "place/delete", payload: id });
            }
        } catch (error) {
            console.error("Error deleting place:", error);
        } finally {
            placesDispatch({ type: "places/loading", payload: false });
        }
    }

    return (
        <PlacesContext.Provider value={{ places, isPlaceLoading, currentPlace, getPlace, createPlace, deletePlace, updatePlace }}
        >
            {children}
        </PlacesContext.Provider>
    );
}

export { PlacesProvider, PlacesContext };