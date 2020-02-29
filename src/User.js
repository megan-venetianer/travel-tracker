var moment = require('moment');

class User {
  constructor(id) {
    this.id = id;
    this.pendingTrips = [];
  }

  findPendingTrips(tripsData) {
    tripsData.forEach(trip => {
      if (this.id === trip.userID && trip.status === 'pending') {
        this.pendingTrips.push(trip)
      }
    })
  }

  findPastTrips(tripsData) {
    let travelerPastTrips = [];
    let travelersTrips = tripsData.filter(trip => {
      return this.id === trip.userID
    })
    travelersTrips.forEach(trip => {
      if (moment(trip.date, "YYYY/MM/DD").fromNow().includes('ago')) {
        travelerPastTrips.push(trip)
      }
    })
    return travelerPastTrips;
  }

  findUpcomingTrips(tripsData) {
    let travelerUpcomingTrips = [];
    let travelersTrips = tripsData.filter(trip => {
      return this.id === trip.userID
    })
    travelersTrips.forEach(trip => {
      if (moment(trip.date, "YYYY/MM/DD").fromNow().includes('in')) {
        travelerUpcomingTrips.push(trip)
      }
    })
    return travelerUpcomingTrips;
  }

  findPresentTrips(tripData) {
    let travelersTrips = tripData.filter(trip => {
      return this.id === trip.userID;
    })
    let presentTrip = travelersTrips.filter(trip => {
      let startDate = new Date(trip.date);
      let endDate = new Date(moment().add(trip.duration, 'days'));
      let today = new Date();
      if (startDate < today && today < endDate) {
        return trip;
      }
    })
    return presentTrip.pop();
  }

  // need to add on functionality to check if it is an approved trip
  findAmountSpent(tripData, destinationData) {
    let yearsTrips = [];
    let travelersTrips = tripData.filter(trip => {
      return this.id === trip.userID;
    })
    travelersTrips.forEach(trip => {
      let thisYearsTrips = trip.date.split('');
      if (thisYearsTrips[3] === '0') {
        yearsTrips.push(trip)
      }
    })
    let yearlyCost = yearsTrips.reduce((tripDetails, trip) => {
      destinationData.forEach(destination => {
        if (destination.id === trip.destinationID) {
          tripDetails += trip.travelers * destination.estimatedFlightCostPerPerson + trip.duration * destination.estimatedLodgingCostPerDay
        }
      })
      return tripDetails;
    }, 0)
    return yearlyCost * 1.1;
  }
}

export default User;
