const {courts} = require("./database.js")

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
      idCourt: reservationData.idCourt,
  }
}


/**
* @param {*} courtData
* @returns
*/
function mapCourtListToResourceObject(courtData){

  const embedded = courts.map( court => mapCourttoResourceObject(court))

  return{
    "_links":{
        "self": halLinkObject(`/courts`),

    },
    "_embedded":{
      "courts": embedded,
    }
  }
}

function mapCourttoResourceObject(courtData, baseURL) {
  return {
      "_links": [{

          "self": halLinkObject(`/courts/${courtData.id}`),
          "courts": halLinkObject(`/court`),
      }],

      name: courtData.name,
      disponibility: courtData.disponibility
  }
}



module.exports = { halLinkObject, mapReservationtoResourceObject, mapReservationListResourceObject, mapCourttoResourceObject, mapCourtListToResourceObject };