import chai, { expect } from 'chai';
import User from '../src/User';
import Traveler from '../src/Traveler';
import TravelAgent from '../src/Travel-agent'
import travelerData from '../data/sampleTravelerData';
import tripsData from '../data/sampleTripsData';
import destinationData from '../data/sampledestinationData';

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

  it('should be able to find a traveler by their name', function() {
    expect(travelAgent.findUser('Rachael Vaughten', travelerData)).to.deep.equal(
      {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"
      }
    )
  });

  it('should have an id property of the traveler they are searching for', function() {
    travelAgent.findUser('Sibby Dawidowitsch', travelerData);
    expect(travelAgent.id).to.equal(3)
  });

  it('should be able to find a traveler\'s trip requests', function() {
    expect(travelAgent.findTripRequests(tripsData)).to.eql(
      [
      {
      "id": 2,
      "userID": 35,
      "destinationID": 25,
      "travelers": 5,
      "date": "2020/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
      },
      {
      "id": 3,
      "userID": 35,
      "destinationID": 22,
      "travelers": 4,
      "date": "2020/05/22",
      "duration": 17,
      "status": "pending",
      "suggestedActivities": []
      },
      {
      "id": 12,
      "userID": 2,
      "destinationID": 48,
      "travelers": 5,
      "date": "2020/06/23",
      "duration": 15,
      "status": "pending",
      "suggestedActivities": []
    }]
    )
  });

  it('should calculate the travel agent\'s total income this calendar year', function() {
    expect(travelAgent.getYearlyIncome(tripsData, destinationData)).to.equal(4439)
  });

  it('should be able to find the number of traveler\'s traveling today', function() {
    expect(travelAgent.getTodaysTravelers(tripsData)).to.equal(7)
  })

});
