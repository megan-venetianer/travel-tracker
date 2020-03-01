import $ from 'jquery';

const dom = {

  hideContent: (content) => {
    $(content).hide()
  },

  renderAmountSpent: (traveler, tripData, destinationData) => {
    let amountSpent = traveler.findAmountSpent(tripData, destinationData);
    $('.amount-spent').html(`<h2>You spent $${amountSpent} on traveling this year!</h2>`);
  },

  renderCurrentTrip: (traveler, tripData, destinationData) => {
    let currentTrip = traveler.findPresentTrips(tripData);
    console.log(currentTrip)
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
              <option value='${destinationName}'>${destinationName}</option>`;
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
      $('.pending-trips').append(html)
    })
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

  unhideContent: (content) => {
    $(content).removeClass('hidden')
  },

  renderAgentDashboard: (travelAgent, tripData, destinationData) => {
    $('.welcome-msg').html(`<h2>Welcome, Agent!</h2>`);
    dom.renderAgentIncome(travelAgent, tripData, destinationData);
  },

  renderAgentIncome: (travelAgent, tripData, destinationData) => {
    let amountSpent = travelAgent.getYearlyIncome(tripData, destinationData);
    $('.amount-spent').html(`<h2>You have made $${amountSpent} in income this year!</h2>`);
  },
};


export default dom;

//
