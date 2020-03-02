class Trip {
  constructor(id, userID, destinationID, travelers, date, duration) {
    this.id = id;
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = 'pending';
    this.suggestedActivities = [];
  }

  getTripCost(destinationData) {
    let tripDestination = destinationData.find(destination => {
      return destination.id === this.destinationID;
    })
    let totalCost = tripDestination.estimatedLodgingCostPerDay * this.duration + tripDestination.estimatedFlightCostPerPerson * this.travelers;
    return Math.round(totalCost * 1.1);
  }

}

export default Trip;
