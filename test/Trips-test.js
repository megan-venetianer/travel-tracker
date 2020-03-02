import chai, { expect } from 'chai';
import User from '../src/User';
import Traveler from '../src/Traveler';
import Trip from '../src/Trips';
import tripData from '../data/sampleTripsData';
import destinationData from '../data/sampleDestinationData';

describe('Trip', function() {
  let trip;

  beforeEach(function() {
    trip = new Trip(354, 3, 8, 5, '2020/06/27', 7);
  });

  it('should be a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of a trip', function() {
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('should have an id', function() {
    expect(trip.id).to.equal(354);
  });

  it('should have a user\'s id', function() {
    expect(trip.userID).to.equal(3)
  });

  it('should have a destination ID', function() {
    expect(trip.destinationID).to.equal(8)
  });

  it('should have a number of travelers', function() {
    expect(trip.travelers).to.equal(5)
  });

  it('should have a start date for the trip', function() {
    expect(trip.date).to.equal('2020/06/27')
  });

  it('should have a duration of the trip in days', function() {
    expect(trip.duration).to.equal(7)
  });

  it('should have a default trip status of pending', function() {
    expect(trip.status).to.equal('pending')
  });

  it('should start with no suggested activities', function() {
    expect(trip.suggestedActivities).to.eql([])
  });

  it('should be able to calculate the cost of a trip request', function() {
    expect(trip.getTripCost(destinationData)).to.equal(6463)
  });

});


//
