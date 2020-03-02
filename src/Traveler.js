import User from './User';

class Traveler extends User {
  constructor(traveler) {
    super();
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
  }

  // makeTripRequest(trip) {
  // return window
  //   .fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips' {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(trip)
  //   })
  //   .then(response => response.json())
  //   .then(data => data)
  //   .catch(error => {
  //     throw error;
  //   });
  // }
}

export default Traveler;
