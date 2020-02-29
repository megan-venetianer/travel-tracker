import User from './User';

class TravelAgent extends User {
  constructor() {
    super();
    this.id = 1;
  }

  // should return user object by passing in the user's name
  findUser() {

  }

  findTripRequests() {

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
