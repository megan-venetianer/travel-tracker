import $ from 'jquery';

const dom = {

  hideContent: (content) => {
    $(content).hide()
  },

  unhideContent: (content) => {
    $(content).removeClass('hidden')
  },

  welcomeMessage: (username) => {
    $('.welcome-msg').html(`<h2>Welcome ${username}!</h2>`)
  },

  renderAmountSpent: (traveler, tripData, destinationData) => {
    let amountSpent = traveler.findAmountSpent(tripData, destinationData);
    $('.amount-spent').html(`<h2>You spent $${amountSpent} on traveling this year!</h2>`);
  },

  renderUpcomingTrips: (traveler, tripData, destinationData) => {
    let travelerTrips = traveler.findUpcomingTrips(tripData);
    travelerTrips.forEach(trip => {
      let tripDestination = destinationData.find(destination => {
        return destination.id === trip.destinationID;
      })
      let html = `<div class ="upcoming-trip-cards">
        <p>${tripDestination.destination}</p>
        <p>Departure Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <img src=${tripDestination.image}
             alt="${tripDestination.destination}"
             title="${tripDestination.destination}">
      </div>`;
      $('.upcoming-trips').append(html)
    })
  },

};


export default dom;

//
