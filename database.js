var bcrypt = require('bcrypt')

class Court{
  constructor(id, name, disponibility) {
    this.id = id;
    this.name = name;
    this.disponibility = disponibility;
  }
}

class User{
  constructor(id, pseudo, isAdmin = false, password) {
      this.id = id;
      this.pseudo = pseudo;
      this.isAdmin = isAdmin;
      this.password = bcrypt.hashSync(password,1);
  }
}

class Reservation {
  constructor(id, reservationDate, idPossibleSlot, idUser, idCourt) {
    this.id = id;
    this.reservationDate = reservationDate;
    this.idPossibleSlot = idPossibleSlot;
    this.idUser = idUser;
    this.idCourt = idCourt;
  }
}

class PossibleSlot {
  constructor(id, slot) {
    this.id = id;
    this.slot = slot;
  }
}


const courts = [
  new Court(1, "A", true),
  new Court(2, "B", false),
  new Court(3, "C", true),
  new Court(4, "D", true),
];

const users = [
  new User(1, "Michel", true, "MichelPassword"),
  new User(2, "Erwan", false, "ErwanPassword"),
  new User(3, "admybad", true, "admybad")
];

const reservations = [
  new Reservation(1, new Date("2023-11-15"), 2, 1, 3),
  new Reservation(2, new Date("2023-12-10"), 1, 2, 1),
];

const possibleslots = [
  new PossibleSlot(1, "10:00"),
  new PossibleSlot(2, "10:45"),
  new PossibleSlot(3, "11:30"),
  new PossibleSlot(4, "12:15"),
  new PossibleSlot(5, "13:00"),
  new PossibleSlot(6, "13:45"),
  new PossibleSlot(7, "14:30"),
  new PossibleSlot(8, "15:15"),
  new PossibleSlot(9, "16:00"),
  new PossibleSlot(10, "16:45"),
  new PossibleSlot(11, "17:30"),
  new PossibleSlot(12, "18:15"),
  new PossibleSlot(13, "19:00"),
  new PossibleSlot(14, "19:45"),
  new PossibleSlot(15, "20:30"),
  new PossibleSlot(16, "21:15"),
];

module.exports = {Court, User, Reservation, PossibleSlot, courts, users, reservations, possibleslots};