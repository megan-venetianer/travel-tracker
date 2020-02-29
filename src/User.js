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
    let travelersTrips = tripData.filter(trip => {
      return travelerId === trip.userID;
    })
    let presentTrip = travelersTrips.filter(trip => {
      let startDate = new Date(trip.date);
      let endDate = new Date(moment().add(trip.duration, 'days').calendar());
      let today = new Date();
      return startDate < today && today < endDate
    })
    return presentTrip.pop();
  }

  // include the 10% travel agent fee
  findAmountSpent(travelerId, tripData, destinationData) {
    let yearsTrips = [];
    let travelersTrips = tripData.filter(trip => {
      return travelerId === trip.userID;
    })
    travelersTrips.forEach(trip => {
      let thisYearsTrips = trip.date.split('');
      if (thisYearsTrips[3] === '0') {
        yearsTrips.push(trip)
      }
    })
    let yearlyCost = yearsTrips.reduce((tripDetails, trip) => {
      console.log(trip)
      destinationData.forEach(destination => {
        if (destination.id === trip.destinationID) {
          tripDetails = tripDetails + trip.travelers * destination.estimatedFlightCostPerPerson + trip.duration * destination.estimatedLodgingCostPerDay
        }
      })
      return tripDetails;
    }, 0)
    return yearlyCost * 1.1;
  }
}


export default User;
