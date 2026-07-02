const Place = require("../models/place");

const addPlace = async (req, res) => {
    try {
        const { cityName, country, countryCode, date, notes, position, status, user } = req.body;
        if (!cityName || !country || !countryCode || !date || !notes || position.lat === undefined || position.lng === undefined || !status || !user) {
            return res.status(400).json({ message: "required fields are missing" });
        }
        const placeExists = await Place.findOne({ user, "position.lat": position.lat, "position.lng": position.lng });
        if (placeExists) {
            return res.status(409).json({ message: "place already pinned" });
        }
        const place = await Place.create({
            cityName,
            country,
            countryCode,
            date,
            notes,
            position,
            status,
            user,
        });
        res.status(201).json({ place });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const deletePlace = async (req, res) => {
    try {
        const { id } = req.params;

        if (id === undefined) {
            return res.status(400).json({ message: "required fields are missing" });
        }
        const deletedPlace = await Place.findByIdAndDelete(id);
        const operationStatus = deletedPlace !== null;
        res.status(200).json({
            message: operationStatus ? "place deleted successfully" : "failed to delete the place",
            isDeleted: operationStatus,
            place: deletedPlace
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getPlace = async (req, res) => {
    try {
        const { id } = req.params;

        if (id === undefined) {
            return res.status(400).json({ message: "required fields are missing" });
        }
        const place = await Place.findById(id);
        res.status(200).json({ place });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getPlaces = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) {
            return res.status(400).json({ message: "required fields are missing" });
        }
        const places = await Place.find({ user });
        res.status(200).json({ places });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const modifyPlace = async (req, res) => {
    try {
        const { id } = req.params;
        const { cityName, country, countryCode, date, notes, position, status, user } = req.body;
        if (!id || !cityName || !date || !notes || !status) {
            return res.status(400).json({ message: "required fields are missing" });
        }
        const placeUpdated = await Place.findByIdAndUpdate(id, {
            cityName,
            date,
            notes,
            status,
        }, { returnDocument: "after" });
        if (!placeUpdated) {
            return res.status(404).json({ message: "place not found", place: placeUpdated });
        }
        res.status(200).json({ place: placeUpdated, message: "place updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addPlace,
    deletePlace,
    getPlace,
    getPlaces,
    modifyPlace
}