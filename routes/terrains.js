var express = require("express");
var router = express.Router();
var db = require("../database");
var hal = require("../hal.js")
var {checkTokenMiddlewareAdmin} = require('../jwt.js')

router.get("/terrains", (req, res, next) => {
  res.status(200).json(hal.mapTerrainListToResourceObject(db.terrains));
});

router.get("/terrains/:id(\\d+)",checkTokenMiddlewareAdmin, (req, res, next) => {
  //récupérer l'id renseigné dans le patch
  const id = req.params.id
  const terrain = db.terrains.find((terrain) => terrain.id == id);

  if (terrain === undefined) {
    res.status(404).json({});
    console.log("Le terrain n'a pas été trouvé");
  }

  const mapTerraintoResourceObject = hal.mapTerraintoResourceObject(terrain)
  res.status(200).json(mapTerraintoResourceObject);
});

module.exports = router;