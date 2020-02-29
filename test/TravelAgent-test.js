import chai, { expect } from 'chai';
import User from '../src/User';
import Traveler from '../src/Traveler';
import TravelAgent from '../src/Travel-agent'
import travelerData from '../data/sampleTravelerData';
import tripsData from '../data/sampleTripsData';

describe('TravelAgent', function() {
  let travelAgent;

  beforeEach(function() {
    travelAgent = new TravelAgent();
  });

  it('should be a function', function() {
    expect(TravelAgent).to.be.a('function');
  });

  it('should be an instance of travelAgent', function() {
    expect(travelAgent).to.be.an.instanceof(TravelAgent);
  });

  it('should be able to find a traveler\'s id by their name', function() {
    expect(travelAgent.findUser('Rachael Vaughten', travelerData)).to.equal(2)
  })

  it('should have an id property of the traveler they are searching for', function() {
    travelAgent.findUser('Sibby Dawidowitsch', travelerData);
    expect(travelAgent.id).to.equal(3)
  })

});
