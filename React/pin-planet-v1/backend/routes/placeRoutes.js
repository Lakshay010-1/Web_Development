const express = require("express");
const router = express.Router();
const { addPlace, deletePlace, getPlaces, getPlace, modifyPlace } = require("../controllers/placeController");


router.get("/", getPlaces);

router.get("/place/:id", getPlace);

router.post("/place", addPlace);

router.patch("/place/:id", modifyPlace);

router.delete("/place/:id", deletePlace);


module.exports = router;