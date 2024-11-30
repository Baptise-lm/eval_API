var express = require("express");
var router = express.Router();
var db = require("../database");
var hal = require("../hal.js")

router.get("/reservations", (req, res, next) => {
  res.status(200).json(hal.mapReservationListResourceObject(db.reservations));
});

router.get("/reservations/:id(\\d+)", (req, res, next) => {
  
  const reservation = db.reservations.find((reservation) => reservation.id == id);

  if (reservation === undefined) {
    res.status(404).json({});
    console.log("La reservation n'a pas été trouvé");
  }

  const mapReservationtoResourceObject = hal.mapReservationtoResourceObject(reservation)
  res.status(200).json(mapReservationtoResourceObject);
});

module.exports = router;