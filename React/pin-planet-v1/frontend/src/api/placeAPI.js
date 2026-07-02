const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API_BASE_URL = BACKEND_URL + "/api/places";

const fetchPlace = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/place/${id}`);
        const data = await response.json();
        if (!response.ok || data.place === null) {
            return { error: 1 };
        }
        return { place: data.place, error: 0 };
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching place info", error);
    }
};

const fetchPlaces = async (user) => {
    try {
        const response = await fetch(`${API_BASE_URL}?user=${user}`);
        if (!response.ok) {
            return { error: 1 };
        }
        const data = await response.json();
        return { places: data.places, error: 0 };
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching user's places", error);
    }
};

const removePlace = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/place/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        if (!data.isDeleted) {
            return { error: 1 };
        }
        return { ...data, error: 0 }
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting place", error);
    }
};

const addPlace = async (place) => {
    try {
        const response = await fetch(`${API_BASE_URL}/place`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(place)
        });
        const data = await response.json();
        if (!response.ok) {
            return { error: 1 };
        }
        return { place: data.place, error: 0 };
    } catch (error) {
        console.error(error);
        throw new Error("Error adding place", error);
    }
};

const modifyPlace = async (place) => {
    const { cityName, notes, status, date, _id: id } = place;
    try {
        const response = await fetch(`${API_BASE_URL}/place/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cityName, notes, status, date })
        });
        const data = await response.json();
        if (!response.ok) {
            return { error: 1 };
        }
        return { place: data.place, error: 0 };
    } catch (error) {
        console.error(error);
        throw new Error("Error updating place", error);
    }
};

export {
    addPlace,
    fetchPlace,
    fetchPlaces,
    removePlace,
    modifyPlace
}