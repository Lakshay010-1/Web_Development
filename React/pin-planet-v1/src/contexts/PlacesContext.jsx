import React, { useEffect, createContext, useReducer, useCallback, } from "react";

const PlacesContext = createContext();

const initialState = {
    places: [],
    currentPlace: {},
    isPlaceLoading: false,
};

function placesReducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isPlaceLoading: action.payload, };
        case "places/loaded":
            return { ...state, places: action.payload, };
        case "place/created":
            return { ...state, places: [...state.places, action.payload], currentPlace: action.payload, };
        case "place/deleted":
            return { ...state, places: state.places.filter((place) => place.id !== action.payload), currentPlace: {}, };
        case "place/loaded":
            return { ...state, currentPlace: action.payload, };
        default:
            throw new Error("Unknown action type");
    }
}

function PlacesContextProvider({ children }) {
    const [{ places, currentPlace, isPlaceLoading }, placesDispatch] =
        useReducer(placesReducer, initialState);

    // Load data from localStorage on first render
    useEffect(() => {
        try {
            placesDispatch({ type: "loading", payload: true });

            const storedPlaces =
                JSON.parse(localStorage.getItem("places")) || [];

            placesDispatch({ type: "places/loaded", payload: storedPlaces, });
        } catch (err) {
            console.error("Error loading places:", err);
        } finally {
            placesDispatch({ type: "loading", payload: false });
        }
    }, []);

    // Save places whenever places array changes
    useEffect(() => {
        localStorage.setItem("places", JSON.stringify(places));
    }, [places]);

    // Get single place
    const getPlace = useCallback(
        function (id) {
            if (Number(id) === currentPlace.id) return;

            try {
                placesDispatch({ type: "loading", payload: true });

                const place = places.find(
                    (place) => place.id === Number(id)
                );

                if (place) {
                    placesDispatch({ type: "place/loaded", payload: place, });
                }
            } catch (err) {
                console.error("Error getting place:", err);
            } finally {
                placesDispatch({ type: "loading", payload: false });
            }
        },
        [places, currentPlace.id]
    );

    // Create new place
    function createPlace(newPlace) {
        try {
            placesDispatch({ type: "loading", payload: true });

            const placeWithId = { ...newPlace, id: Date.now(), };

            placesDispatch({ type: "place/created", payload: placeWithId, });
        } catch (err) {
            console.error("Error creating place:", err);
        } finally {
            placesDispatch({ type: "loading", payload: false });
        }
    }

    // Delete place
    function deletePlace(id) {
        try {
            placesDispatch({ type: "loading", payload: true });

            placesDispatch({ type: "place/deleted", payload: id, });
        } catch (err) {
            console.error("Error deleting place:", err);
        } finally {
            placesDispatch({ type: "loading", payload: false });
        }
    }

    return (
        <PlacesContext.Provider value={{ places, isPlaceLoading, currentPlace, getPlace, createPlace, deletePlace, }}
        >
            {children}
        </PlacesContext.Provider>
    );
}

export { PlacesContextProvider, PlacesContext };