import $ from 'jquery';
// var moment = require('moment');

const dom = {

  getTripEstimate: (trip, destinationData) => {
    let tripEstimate = trip.getTripCost(destinationData);
    $('.trip-estimate').text(`Trip Estimate: $${tripEstimate}`);
  },

  hideContent: (content) => {
    $(content).hide()
  },

  renderAgentDashboard: (travelAgent, tripData, destinationData) => {
    $('.welcome-msg').html(`<h2>Welcome, Agent!</h2>`);
    dom.renderAgentIncome(travelAgent, tripData, destinationData);
    dom.renderTodaysTravelers(travelAgent, tripData);
    dom.renderAllPendingTrips(travelAgent, tripData, destinationData)
  },

  renderAgentIncome: (travelAgent, tripData, destinationData) => {
    let amountSpent = travelAgent.getYearlyIncome(tripData, destinationData);
    $('.monetary-display').html(`<h2>You have made $${amountSpent} in income this year!</h2>`);
  },

  renderAllPendingTrips: (travelAgent, tripData, destinationData) => {
    let pendingTrips = travelAgent.findTripRequests(tripData);
    pendingTrips.forEach(trip => {
      let tripDestination = destinationData.find(destination => {
        return destination.id === trip.destinationID;
      })
      console.log(tripDestination)
      let html = `<div class ="trip-request-cards" id=${trip.id}>
        <h4>${tripDestination.destination}</h4>
        <p>Departure Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <img src=${tripDestination.image}
             alt="${tripDestination.destination}"
             title="${tripDestination.destination}">
        <button class="approve-trip-btn">Approve</button>
        <button class="deny-trip-btn">Cancel Trip</button>
      </div>`;
      $('.trip-requests-all').append(html)
    })
  },

  renderAmountSpent: (traveler, tripData, destinationData) => {
    let amountSpent = traveler.findAmountSpent(tripData, destinationData);
    $('.monetary-display').html(`<h2>You spent $${amountSpent} on traveling this year!</h2>`);
  },

  renderCurrentTrip: (traveler, tripData, destinationData) => {
    let currentTrip = traveler.findPresentTrips(tripData);
    if (currentTrip === undefined) {
      return
    }
    destinationData.forEach(destination => {
      if (destination.id === currentTrip.destinationID) {
        $('.current-trip').html(`<h2>Enjoy your current vacation in ${destination.destination}!</h2>`)
      }
    })
  },

  renderDestinationDropDown: (destinationData) => {
    destinationData.forEach(destination => {
      let destinationName = destination.destination;
      let html = `
              <option id="destination-dropdown"
              value='${destinationName}'>${destinationName}
              </option>`;
      $('.destination-dropdown').append(html);
    })
  },

  renderPastTrips: (traveler, tripData, destinationData) => {
    let travelerTrips = traveler.findPastTrips(tripData);
    travelerTrips.forEach(trip => {
      let tripDestination = destinationData.find(destination => {
        return destination.id === trip.destinationID;
      })
      let html = `<div class ="upcoming-trip-cards">
        <h4>${tripDestination.destination}</h4>
        <p>Departure Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <img src=${tripDestination.image}
             alt="${tripDestination.destination}"
             title="${tripDestination.destination}">
      </div>`;
      $('.past-trips').append(html)
    })
  },

  renderPendingTrips: (traveler, tripData, destinationData) => {
    let travelerTrips = traveler.findPendingTrips(tripData);
    travelerTrips.forEach(trip => {
      let tripDestination = destinationData.find(destination => {
        return destination.id === trip.destinationID;
      })
      let html = `<div class ="pending-trip-cards">
        <h4>${tripDestination.destination}</h4>
        <p>Departure Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <img src=${tripDestination.image}
             alt="${tripDestination.destination}"
             title="${tripDestination.destination}">
      </div>`;
      $('.pending-trips').append(html);
    })
  },

  renderSearchedTravelerPending: (traveler, tripData, destinationData) => {
    let travelerTrips = traveler.findPendingTrips(tripData);
    travelerTrips.forEach(trip => {
      let tripDestination = destinationData.find(destination => {
        return destination.id === trip.destinationID;
      })
      let html = `<div class ="pending-trip-cards" id=${trip.id}>
        <h4>${tripDestination.destination}</h4>
        <p>Departure Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <img src=${tripDestination.image}
             alt="${tripDestination.destination}"
             title="${tripDestination.destination}">
        <button class="approve-trip-btn">Approve</button>
        <button class="deny-trip-btn">Cancel Trip</button>
      </div>`;
      $('.pending-trips').append(html);
    })
  },

  clearTrips() {
    $('.upcoming-trip-cards').empty();
    $('.pending-trip-cards').empty();
    $('.past-trip-cards').empty();
  },

  renderSearchedTravelerInfo: (traveler, tripData, destinationData) => {
    $('.welcome-msg').html(`<h2>${traveler.name}'s Trips</h2>`);
    dom.renderSearchedTravelerPending(traveler, tripData, destinationData);
    dom.renderUpcomingTrips(traveler, tripData, destinationData);
    dom.renderPastTrips(traveler,tripData, destinationData)
  },

  renderTodaysTravelers: (travelAgent, tripData) => {
    let travelersToday = travelAgent.getTodaysTravelers(tripData);
    $('.todays-travelers').html(`<h3>There are ${travelersToday} people traveling today!`)
  },

  renderTravelerDashboard: (username, traveler, tripData, destinationData) => {
    $('.welcome-msg').html(`<h2>Welcome, ${username}!</h2>`);
    dom.renderUpcomingTrips(traveler, tripData, destinationData);
    dom.renderPastTrips(traveler,tripData, destinationData);
    dom.renderDestinationDropDown(destinationData);
    dom.renderPendingTrips(traveler, tripData, destinationData);
    dom.renderAmountSpent(traveler, tripData, destinationData);
    dom.renderCurrentTrip(traveler, tripData, destinationData)
  },

  renderUpcomingTrips: (traveler, tripData, destinationData) => {
    let travelerTrips = traveler.findUpcomingTrips(tripData);
    travelerTrips.forEach(trip => {
      let tripDestination = destinationData.find(destination => {
        return destination.id === trip.destinationID;
      })
      let html = `<div class ="upcoming-trip-cards">
        <h4>${tripDestination.destination}</h4>
        <p>Departure Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <img src=${tripDestination.image}
             alt="${tripDestination.destination}"
             title="${tripDestination.destination}">
      </div>`;
      $('.upcoming-trips').append(html)
    })
  },

  searchTraveler: (travelerData) => {
    let travelerName = $('#traveler-input').val();
    let searchedTraveler = travelerData.find(traveler => {
      return traveler.name === travelerName;
    })
    return searchedTraveler;
  },

  unhideContent: (content) => {
    $(content).removeClass('hidden')
  },

};


export default dom;

//
