import chai, { expect } from 'chai';
import User from '../src/User';
import tripsData from '../data/sampleTripsData';
import destinationData from '../data/sampleDestinationData';

describe('User', function() {
  let user;

  beforeEach(function() {
    user = new User()
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of user', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should be able to get a user\'s pending trips', function() {
    user.findPendingTrips(35, tripsData)
    expect(user.pendingTrips).to.eql(
    [{
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
    }])
  });

  it('should find a traveler\'s past trips', function() {
    expect(user.findPastTrips(44, tripsData)).to.eql(
      [{
      "id": 1,
      "userID": 44,
      "destinationID": 49,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    },
    {
    "id": 9,
    "userID": 44,
    "destinationID": 19,
    "travelers": 5,
    "date": "2019/12/19",
    "duration": 19,
    "status": "approved",
    "suggestedActivities": []
    }
    ])
  });

  it('should find a traveler\'s upcoming trips', function() {
    expect(user.findUpcomingTrips(43, tripsData)).to.eql(
      [{
        "id": 6,
        "userID": 43,
        "destinationID": 35,
        "travelers": 3,
        "date": "2020/06/29",
        "duration": 9,
        "status": "approved",
        "suggestedActivities": []
      },
      {
      "id": 11,
      "userID": 43,
      "destinationID": 5,
      "travelers": 4,
      "date": "2020/10/14",
      "duration": 4,
      "status": "approved",
      "suggestedActivities": []
    }
    ])
  });

  it('should calculate how much a traveler has spent on trips in this calendar year', function() {
    expect(user.findAmountSpent())
  })

});

//
