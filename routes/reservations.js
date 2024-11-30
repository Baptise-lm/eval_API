var express = require("express");
var router = express.Router();
var db = require("../database");
var hal = require("../hal.js")
var {checkTokenMiddleware} = require('../jwt.js')

router.get("/reservations", checkTokenMiddleware, (req, res, next) => {
  res.status(200).json(hal.mapReservationListResourceObject(db.reservations));
});

router.get("/users/:id(\\d+)/reservations", checkTokenMiddleware, (req, res, next) => {
  //récupérer l'id renseigné dans le patch
  const id = req.params.id
  const reservation = db.reservations.find((reservation) => reservation.idUser == id);

  if (reservation === undefined) {
    res.status(404).json({});
    console.log("Le reservation n'a pas été trouvé");
  }

  const mapReservationtoResourceObject = hal.mapReservationtoResourceObject(reservation)
  res.status(200).json(mapReservationtoResourceObject);
});

module.exports = router;