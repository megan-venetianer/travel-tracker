import User from './User';

class Traveler extends User {
  constructor(traveler) {
    super();
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
  }

}

export default Traveler;
