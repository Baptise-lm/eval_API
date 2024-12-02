var express = require("express");
var router = express.Router();
var db = require("../database");
var hal = require("../hal.js")
var {checkTokenMiddlewareAdmin} = require('../jwt.js')

router.get("/courts", checkTokenMiddlewareAdmin,(req, res, next) => {
  res.status(200).json(hal.mapCourtListToResourceObject(db.courts));
});

router.get("/courts/:id(\\d+)",checkTokenMiddlewareAdmin, (req, res, next) => {
  //récupérer l'id renseigné dans le patch
  const id = req.params.id
  const court = db.courts.find((court) => court.id == id);

  if (court === undefined) {
    res.status(404).json({});
    console.log("Le court n'a pas été trouvé");
  }

  const mapCourttoResourceObject = hal.mapCourttoResourceObject(court)
  res.status(200).json(mapCourttoResourceObject);
});

module.exports = router;