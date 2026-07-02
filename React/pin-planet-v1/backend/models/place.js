const mongoose = require("mongoose");

const placeSchema = mongoose.Schema(
    {
        cityName: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        countryCode: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        notes: {
            type: String,
            required: true
        },
        position: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        },
        status: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Place", placeSchema);