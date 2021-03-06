import $ from 'jquery';
import dom from './domUpdates';
var moment = require('moment');
import Traveler from './Traveler';
import TravelAgent from './Travel-agent';
import Trip from './Trips';
import User from './User';

// ---------- css ----------
import './css/base.scss';

// ---------- images ----------
import './images/rocketship.svg';

// ------fetch functions-------
function fetchAllData() {
  let travelerData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/')
  .then((response) => response.json())
  .catch(error => console.log(error.message));

  let destinationData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then((response) => response.json())
  .catch(error => console.log(error.message));

  let tripData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  .then((response) => response.json())
  .catch(error => console.log(error.message));

  return Promise.all([travelerData, destinationData, tripData])
    .then(response => {
      let allData = {};
      allData.travelerData = response[0].travelers;
      allData.destinationData = response[1].destinations;
      allData.tripData = response[2].trips;
      return allData;
    })
    .catch(error => console.log(error.message));
}

// ---------variables-----------

let destinationData;
let traveler;
let travelAgent;
let travelerData;
let tripData;
let trip;

fetchAllData().then(data => {
  travelerData = data.travelerData;
  destinationData = data.destinationData;
  tripData = data.tripData;
})
  .catch(error => console.log(error.message))

// -----------event listeners--------------

  $('.login-btn').click(validateUser);
  $('.trip-estimate-btn').click(getTripEstimate);
  $('.book-trip-btn').click(submitTripRequest);
  $('.trip-requests-all').click(approveTripRequest);
  $('.trip-requests-all').click(cancelTrip);
  $('.pending-trips').click(approveTripRequest);
  $('.pending-trips').click(cancelTrip);
  $('.search-traveler-submit').click(searchForTraveler);
  $('#trip-date').keyup(enableButtons);
  $('#number-days-input').keyup(enableButtons);
  $('#number-travelers-input').keyup(enableButtons)

// -------------functions------------------

let numberedTravelers = [];
for (let i = 0; i < 50; i++) {
  numberedTravelers.push(`traveler${i + 1}`)
};

function validateUser() {
  let usernameInput = $('.username-input').val();
  let usernamePassword = $('.password-input').val();
  if (usernameInput === 'agency' && usernamePassword === 'travel2020') {
    travelAgent = new TravelAgent();
    dom.hideContent('.login-form');
    dom.unhideContent('.todays-travelers, .trip-requests-all, .agent-form');
    dom.renderAgentDashboard(travelAgent, tripData, destinationData);
  } else if (numberedTravelers.includes(usernameInput) && usernamePassword === 'travel2020') {
    dom.hideContent('.login-form');
      if (usernameInput.length === 10) {
        let travelerNumber = parseInt(usernameInput.split('').splice(8, 2).join(''))
        traveler = new Traveler(travelerData[`${travelerNumber - 1}`])
      } else {
        let userNumber = parseInt(usernameInput.split('').splice(8, 1).join(''))
        traveler = new Traveler(travelerData[`${userNumber - 1}`])
      }
    dom.renderTravelerDashboard(traveler.name, traveler, tripData, destinationData);
    dom.unhideContent('.upcoming-trips, .past-trips, .pending-trips, .left-section');
  } else {
    $('.error-message').text(`Incorrect username or password`)
  }
    return traveler;
  };

  function getDestinationID(destinationData) {
    let chosenDestination = $('.destination-dropdown').val()
    let currentDestination = destinationData.find(destinationInfo => {
      return chosenDestination === destinationInfo.destination;
    })
    return currentDestination.id;
  };

  function instantiateTrip() {
    let dateInput = moment($('#trip-date').val()).format('YYYY/MM/DD');
    let numberDaysInput = parseInt($('#number-days-input').val());
    let travelersNumber = parseInt($('#number-travelers-input').val());
    trip = new Trip(Date.now(), traveler.id, getDestinationID(destinationData), travelersNumber, dateInput, numberDaysInput);
  };

  function enableButtons() {
    let dateInput = moment($('#trip-date').val()).format('YYYY/MM/DD');
    let numberDaysInput = parseInt($('#number-days-input').val());
    let travelersNumber = parseInt($('#number-travelers-input').val());
    if (numberDaysInput && dateInput && travelersNumber) {
      $('.button').prop('disabled', false);
    }
  };

  function getTripEstimate() {
    $('.book-trip-form').submit(e => {
      e.preventDefault();
    });
    instantiateTrip();
    dom.getTripEstimate(trip, destinationData);
  };

  function submitTripRequest() {
    $('.book-trip-form').submit(e => {
      e.preventDefault();
    })
    instantiateTrip();
    traveler.makeTripRequest(trip);
  };

  function approveTripRequest() {
    if ($(event.target).hasClass("approve-trip-btn")) {
      let targetId = parseInt(event.target.parentElement.id);
        travelAgent.approveTripRequest(targetId);

    }
  };

  function cancelTrip() {
    if ($(event.target).hasClass("deny-trip-btn")) {
      let targetId = parseInt(event.target.parentElement.id);
        travelAgent.denyUpcomingTrip(targetId);
    }
  };

  function searchForTraveler() {
    let searchedTraveler = dom.searchTraveler(travelerData);
    traveler = new Traveler(searchedTraveler);
    dom.clearTrips();
    dom.unhideContent('.upcoming-trips, .past-trips, .pending-trips');
    dom.hideContent('.trip-requests-all');
    dom.renderSearchedTravelerInfo(traveler, tripData, destinationData);
    dom.renderAgentIncome(travelAgent, tripData, destinationData);
  };

//
