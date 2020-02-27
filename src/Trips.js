class Trips {
  constructor(trips) {
    this.id = trips.id;
    this.userID = trips.userID;
    this.destinationID = trips.destinationID;
    this.travelers = trips.travelers;
    this.date = trips.date;
    this.duration = trips.duration;
    this.status = trips.status;
    this.suggestedActivities = trips.suggestedActivities;
  }

  // select date, number of travelers, and destination to make request.
  // This will require POST request to the trips endpoint
  makeTripRequest() {

  }

  // after making selections above (date, # travelers, destination) + a 10% agent fee
  getTripCost() {

  }

}

export default Trips;
