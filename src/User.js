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
    let travelerPastTrips = [];
    let travelersTrips = tripsData.filter(trip => {
      return travelerId === trip.userID
    })
    travelersTrips.forEach(trip => {
      if (moment(trip.date, "YYYY/MM/DD").fromNow().includes('ago')) {
        travelerPastTrips.push(trip)
      }
    })
    return travelerPastTrips;
  }

  findUpcomingTrips(travelerId, tripsData) {
    let travelerUpcomingTrips = [];
    let travelersTrips = tripsData.filter(trip => {
      return travelerId === trip.userID
    })
    travelersTrips.forEach(trip => {
      if (moment(trip.date, "YYYY/MM/DD").fromNow().includes('in')) {
        travelerUpcomingTrips.push(trip)
      }
    })
    return travelerUpcomingTrips;
  }

  findPresentTrips(travelerId, tripData) {

  }

  findAmountSpent(travelerId, tripData, destinationData) {

  }
}


export default User;
