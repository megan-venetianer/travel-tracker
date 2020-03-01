import $ from 'jquery';

const dom = {

  hideContent: (content) => {
    $(content).hide()
  },

  renderAmountSpent: (traveler, tripData, destinationData) => {
    let amountSpent = traveler.findAmountSpent(tripData, destinationData);
    $('.amount-spent').html(`<h2>You spent $${amountSpent} on traveling this year!</h2>`);
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

  welcomeMessage: (username) => {
    $('.welcome-msg').html(`<h2>Welcome ${username}!</h2>`)
  },

};


export default dom;

//
