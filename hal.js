/**
 * Export des fonctions helpers pour la spécification HAL
 * Voir la spécification HAL : https://stateless.group/hal_specification.html
 * Voir la spécification HAL (RFC, source) : https://datatracker.ietf.org/doc/html/draft-kelly-json-hal
 */

const {terrains} = require("./database.js")

/**
 * Retourne un Link Object, conforme à la spécification HAL
 * @param {*} url 
 * @param {*} type 
 * @param {*} name 
 * @param {*} templated 
 * @param {*} deprecation 
 * @returns 
 */
function halLinkObject(url, type = '', name = '', templated = false, deprecation = false) {

  return {
      "href": url,
      "templated": templated,
      ...(type && { "type": type }),
      ...(name && { "name": name }),
      ...(deprecation && { "deprecation": deprecation })
  }
}

/**
* @param {*} reservationData
* @returns
*/

function mapReservationListResourceObject(reservations){

  const embedded = reservations.map(Reservation => mapReservationtoResourceObject(Reservation))

  return {

    "_links" : {
      "self" : halLinkObject('/reservations')
    },

    "_embedded": {
      "reservations": embedded
    }


  }
}


function mapReservationtoResourceObject(reservationData, baseURL) {
  return {
      "_links": [{

          "self": halLinkObject(`/reservations/${reservationData.id}`),
          "reservations": halLinkObject(`/reservation`),
      }],

      reservationDate: reservationData.reservationDate,
      idPossibleSlot: reservationData.idPossibleSlot,
      idUser: reservationData.idUser,
      idTerrain: reservationData.idTerrain,
  }
}


/**
* @param {*} terrainData
* @returns
*/
function mapTerrainListToResourceObject(terrainData){

  const embedded = terrains.map( terrain => mapTerraintoResourceObject(terrain))

  return{
    "_links":{
        "self": halLinkObject(`/terrains`),

    },
    "_embedded":{
      "concerts": embedded,
    }
  }
}

function mapTerraintoResourceObject(terrainData, baseURL) {
  return {
      "_links": [{

          "self": halLinkObject(`/terrains/${terrainData.id}`),
          "terrains": halLinkObject(`/terrain`),
      }],

      name: terrainData.name,
      disponibility: terrainData.disponibility
  }
}



module.exports = { halLinkObject, mapReservationtoResourceObject, mapReservationListResourceObject, mapTerraintoResourceObject, mapTerrainListToResourceObject };