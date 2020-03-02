import User from './User';
var moment = require('moment');

class TravelAgent extends User {
  constructor() {
    super();
    this.id;
  }

  // findUser(travelerName, travelerData) {
  //   let travelerInfo = travelerData.filter(traveler => {
  //     return travelerName === traveler.name;
  //   })
  //   this.id = travelerInfo[0].id;
  //   return travelerInfo[0];
  // }

  findTripRequests(tripsData) {
    return tripsData.filter(trip => {
      return trip.status === 'pending'
    })
  }

  // total income generated this year (10% of user trip cost)
  getYearlyIncome(tripsData, destinationData) {
    let yearsTrips = [];
    tripsData.forEach(trip => {
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
    return Math.round(yearlyCost * .1);
  }

  getTodaysTravelers(tripsData) {
    let currentTrips = [];
    tripsData.filter(trip => {
      let startDate = new Date(trip.date);
      let endDate = new Date(moment(startDate).add(trip.duration, 'days'));
      let today = new Date();
      if (startDate < today && today < endDate) {
        currentTrips.push(trip);
      }
    })
    return currentTrips.reduce((tripInfo, trip) => {
      tripInfo += trip.travelers;
      return tripInfo;
    }, 0)
  }

  // will require a POST request, changing the trip status to approved
  approveTripRequest(id) {
    const tripModification = {
      id: id,
      status: 'approved'
    }

    return window
      .fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tripModification)
      })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => {
        console.log(error.message);
      });
  }

  denyUpcomingTrip(id) {
    const modification = {
      id: id
    }

    return window
      .fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modification)
      })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => {
        console.log(error.message);
    });
  }
}

export default TravelAgent;
