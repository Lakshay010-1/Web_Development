import React, { useEffect, createContext } from "react";
import { useReducer, useCallback } from "react";

const PlacesContext = createContext();
const intialState = {
    places: [],
    currentPlace: {},
    isPlaceLoading: false
}

function placesReducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isPlaceLoading: action.payload };
        case "places/loaded":
            return { ...state, places: action.payload };
        case "place/created":
            return { ...state, places: [...state.places, action.payload], currentPlace: action.payload };
        case "place/deleted":
            return { ...state, places: state.places.filter(place => place.id !== action.payload), currentPlace: {} };
        case "place/loaded":
            return { ...state, currentPlace: action.payload };
        default:
            throw new Error("Unknown action type");
    }
}

function PlacesContextProvider(props) {
    const BASE_URL = "http://localhost:9000";
    const [{ places, currentPlace, isPlaceLoading }, placesDispatch] = useReducer(placesReducer, intialState);

    const getPlace = useCallback(async function (id) {
        if (Number(id) === currentPlace.id) return;
        try {
            placesDispatch({ type: "loading", payload: true });
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            placesDispatch({ type: "place/loaded", payload: data });
        } catch (err) {
            console.error("Error fetching place info : ", err);
        } finally {
            placesDispatch({ type: "loading", payload: false });
        }
    }, [currentPlace.id])

    async function createPlace(newPlace) {
        try {
            placesDispatch({ type: "loading", payload: true });
            const response = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newPlace),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            placesDispatch({ type: "place/created", payload: data });
        } catch (err) {
            console.error("Error posting place info : ", err);
        } finally {
            placesDispatch({ type: "loading", payload: false });
        }
    }

    async function deletePlace(id) {
        try {
            placesDispatch({ type: "loading", payload: true });
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            placesDispatch({ type: "place/deleted", payload: id });
        } catch (err) {
            console.error("Error deleting place info : ", err);
        } finally {
            placesDispatch({ type: "loading", payload: false });
        }
    }
    useEffect(() => {
        async function setData() {
            try {
                placesDispatch({ type: "loading", payload: true });
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                placesDispatch({ type: "places/loaded", payload: data });
            } catch (err) {
                console.error("Error fetching places : ", err);
            } finally {
                placesDispatch({ type: "loading", payload: false });
            }
        }
        setData();
    }, []);
    return (
        <PlacesContext.Provider value={{ places, isPlaceLoading, currentPlace, getPlace, createPlace, deletePlace }}>
            {props.children}
        </PlacesContext.Provider>
    )
}


export { PlacesContextProvider, PlacesContext };