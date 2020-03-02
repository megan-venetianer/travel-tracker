var moment = require('moment');

class User {
  constructor(id) {
    this.id = id;
  }

  findPendingTrips(tripsData) {
    let pendingTrips = [];
    tripsData.forEach(trip => {
      if (this.id === trip.userID && trip.status === 'pending') {
        pendingTrips.push(trip)
      }
    })
    return pendingTrips;
  }

  // need to revisit this method since it includes current trips as well
  findPastTrips(tripsData) {
    let travelerPastTrips = [];
    let travelersTrips = tripsData.filter(trip => {
      return this.id === trip.userID
    })
    travelersTrips.forEach(trip => {
      if (moment(trip.date, "YYYY/MM/DD").fromNow().includes('ago') && trip.status === 'approved') {
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
      if (moment(trip.date, "YYYY/MM/DD").fromNow().includes('in') && trip.status === 'approved') {
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
      let endDate = new Date(moment(startDate).add(trip.duration, 'days'));
      let today = new Date();
      if (startDate < today && today < endDate) {
        return trip;
      }
    })
      return presentTrip.pop();
  }

  findAmountSpent(tripData, destinationData) {
    let yearsTrips = [];
    let travelersTrips = tripData.filter(trip => {
      return this.id === trip.userID;
    })
    travelersTrips.forEach(trip => {
      let thisYearsTrips = trip.date.split('');
      if (thisYearsTrips[3] === '0' && trip.status === 'approved') {
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
    return Math.round(yearlyCost * 1.1);
  }
}

export default User;
