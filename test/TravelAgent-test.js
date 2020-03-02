import chai, { expect } from 'chai';
import spies from 'chai-spies';
import User from '../src/User';
import Traveler from '../src/Traveler';
import TravelAgent from '../src/Travel-agent';
import travelerData from '../data/sampleTravelerData';
import tripsData from '../data/sampleTripsData';
import destinationData from '../data/sampledestinationData';

chai.use(spies);

describe('TravelAgent', function() {
  let travelAgent;
  global.window = {};

  beforeEach(function() {
    travelAgent = new TravelAgent();
    chai.spy.on(window, 'fetch', () => new Promise((resolve, reject) => {}));
  });

  afterEach(function () {
    chai.spy.restore();
  });

  it('should be a function', function() {
    expect(TravelAgent).to.be.a('function');
  });

  it('should be an instance of travelAgent', function() {
    expect(travelAgent).to.be.an.instanceof(TravelAgent);
  });

  it('should be able to find all trip requests', function() {
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
  });

  it('should be able to approve a pending trip request', function() {
    travelAgent.approveTripRequest(354);
    const tripModification = {
      id: 354,
      status: 'approved'
    };
    expect(window.fetch).to.be.called(1);
    expect(window.fetch).to.be.called.with(
      'https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(tripModification)
      }
    );
  });

  it('should be able to delete a pending trip request', function() {
    travelAgent.denyUpcomingTrip(354);
    const tripModification = {
      id: 354,
    };
    expect(window.fetch).to.be.called(1);
    expect(window.fetch).to.be.called.with(
      'https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(tripModification)
      }
    );
  })

});
