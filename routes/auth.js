var express = require("express");
var router = express.Router();
var database = require("../database");
var hal = require("../hal");
var bcrypt = require("bcrypt");
var jwt = require("../jwt");

/**
 * Retourne vrai si l'user est authentifié par le système, faux sinon
 * @param {} login
 * @param {*} password
 * @returnsbcrypt
 */
function isAuthentificated(login, password) {
  const user = database.users.find((user) => {
    return user.pseudo === login && bcrypt.compareSync(password, user.password);
  });

  if (user === undefined) return false;

  return true;
}

function findUserByPseudo(pseudo) {
  return database.users.find((user) => user.pseudo === pseudo);
}

/**
 * Retourne vrai si l'user est admin, faux sinon
 * @param {} pseudo
 * @returns
 */
function isAdmin(pseudo) {
  const user = findUserByPseudo(pseudo);
  return user && user.isAdmin;
}

router.post("/login", (req, res, next) => {

  const login = req.body.pseudo;
  const password = req.body.password;

  const isAuthAsAdmin = isAuthentificated(login, password) && isAdmin(login);

  if (!isAuthAsAdmin) {
    let responseObject = {
      _links: {
        self: hal.halLinkObject("/login"),
      },
      message: "Vous n'avez pas accès à cette ressource.",
    };
    res.status(401).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
    return;
  }

  const accessToken = jwt.createJWT(login, true, "1 day");

  let responseObject = {
    _links: {
      self: hal.halLinkObject("/login"),
      reservations: hal.halLinkObject(
        "/terrains/{id}/reservations",
        "string",
        "",
        true
      ),
    },
    jwt: accessToken,
    message: `Bienvenue ${login} !`,
  };

  return res.status(200).format({
    "application/hal+json": function () {
      res.send(responseObject);
    },
  });
});

module.exports = router;
