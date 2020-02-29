import chai, { expect } from 'chai';
import User from '../src/User';
import Traveler from '../src/Traveler';
import travelerData from '../data/sampleTravelerData';

describe('Traveler', function() {
  let traveler;

  beforeEach(function() {
    const sampleTraveler = travelerData[1];
    traveler = new Traveler(sampleTraveler);
  });

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of traveler', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should have a name', function() {
    expect(traveler.name).to.equal('Rachael Vaughten');
  })

  it('should have a traveler type', function() {
    expect(traveler.travelerType).to.equal('thrill-seeker');
  })

});
//
