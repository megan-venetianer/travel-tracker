import $ from 'jquery';
import dom from './domUpdates';
import Traveler from './Traveler';
import TravelAgent from './Travel-agent';
import User from './User';
var moment = require('moment');

// ---------- css ----------
import './css/base.scss';

// ---------- images ----------
// import './images/mountains-lake.jpg';

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

let travelerData;
let destinationData;
let tripData;
let traveler;
let travelAgent;

fetchAllData().then(data => {
  travelerData = data.travelerData;
  destinationData = data.destinationData;
  tripData = data.tripData;
})
  .catch(error => console.log(error.message))

// event listeners
  $('.login-btn').click(validateUser);
  $('.trip-estimate-btn').click(getTripEstimate);
  $('.book-trip-btn').click(submitTripRequest);

// functions

let numberedTravelers = [];
for (let i = 0; i < 50; i++) {
  numberedTravelers.push(`traveler${i + 1}`)
}

function validateUser() {
  $('.login').submit(e => {
    e.preventDefault();
  })
  let usernameInput = $('.username-input').val();
  let usernamePassword = $('.password-input').val();
  if (usernameInput === 'agency' && usernamePassword === 'travel2020') {
    travelAgent = new TravelAgent();
    dom.hideContent('.login-form');
    dom.unhideContent('.todays-travelers');
    dom.unhideContent('.trip-requests-all');
    dom.unhideContent('.agent-form');
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
    dom.unhideContent('.upcoming-trips');
    dom.unhideContent('.past-trips');
    dom.unhideContent('.pending-trips');
    dom.unhideContent('.left-section')
    };
    return traveler;
  }

  function getTripEstimate() {
    $('.book-trip-form').submit(e => {
      e.preventDefault();
    })
    let dateInput = $('#trip-date').val();
    let destinationInput = $('#destination-dropdown').val()
    let numberDaysInput = parseInt($('#number-days-input').val());
    let travelersNumber = parseInt($('#number-travelers-input').val());
    console.log(dateInput)
    console.log(destinationInput)
    console.log(numberDaysInput)
    console.log(travelersNumber)
  }

  function submitTripRequest() {
    $('.book-trip-form').submit(e => {
      e.preventDefault();
    })
  }


export default fetchAllData;


//
