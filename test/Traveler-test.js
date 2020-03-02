import chai, { expect } from 'chai';
import spies from 'chai-spies';
import User from '../src/User';
import Traveler from '../src/Traveler';
import Trip from '../src/Trips';
import travelerData from '../data/sampleTravelerData';

chai.use(spies);

describe('Traveler', function() {
  let traveler;
  let trip;
  global.window = {};

  beforeEach(function() {
    const sampleTraveler = travelerData[1];
    traveler = new Traveler(sampleTraveler);
    trip = new Trip(354, 3, 8, 5, '2020/06/27', 7);
    chai.spy.on(window, 'fetch', () => new Promise((resolve, reject) => {}));
  });

  afterEach(function () {
    chai.spy.restore();
  });

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of traveler', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should have a name', function() {
    expect(traveler.name).to.equal('Rachael Vaughten');
  });

  it('should have a traveler type', function() {
    expect(traveler.travelerType).to.equal('thrill-seeker');
  });

  it('should be able to submit a trip request', function() {
    traveler.makeTripRequest(trip);

    expect(window.fetch).to.be.called(1);
    expect(window.fetch).to.be.called.with(
      'https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(trip)
      }
    );
  });
});
//
