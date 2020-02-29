import User from './User';

class TravelAgent extends User {
  constructor() {
    super();
    this.id;
  }

  findUser(travelerName, travelerData) {
    let travelerInfo = travelerData.filter(traveler => {
      return travelerName === traveler.name;
    })
    this.id = travelerInfo[0].id;
    return travelerInfo[0].id
  }

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
    return Math.round(yearlyCost * 1.1);
  }

  // number of travelers on today's date
  getTodaysTravelers() {

  }

  // will require a POST request, changing the trip status to approved
  approveTripRequest() {

  }

  // will require a DELETE request to the bookings endpoint
  denyUpcomingTrip() {

  }
}

export default TravelAgent;
