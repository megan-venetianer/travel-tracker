var moment = require('moment');

class User {
  constructor() {
    this.pendingTrips = [];
  }

  findPendingTrips(travelerId, tripsData) {
    tripsData.forEach(trip => {
      if (travelerId === trip.userID && trip.status === 'pending') {
        this.pendingTrips.push(trip)
      }
    })
  }

  findPastTrips(travelerId, tripsData) {
    // let travelerAllTrips = [];
    let travelerPastTrips = [];
    let travelersTrips = tripsData.filter(trip => {
      return travelerId === trip.userID
    })
    travelersTrips.forEach(trip => {
      let travelersDates = trip.date.split('').filter(number => {
        return number !== '/'
      }).join('')
      if (moment(travelersDates, "YYYYMMDD").fromNow().includes('ago')) {
        travelerPastTrips.push(trip)
      }
    })
    return travelerPastTrips;
  }

  findUpcomingTrips(traveler) {

  }

  findPresentTrips(travelerId, tripData) {

  }

  findAmountSpent(traveler) {

  }
}


export default User;
