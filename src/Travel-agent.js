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
    let tripRequests = tripsData.filter(trip => {
      return trip.status === 'pending'
    })
    return tripRequests
  }

  // total income generated this year (10% of user trip cost)
  getTotalIncome() {

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
