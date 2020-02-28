import $ from 'jquery';
import dom from './domUpdates';

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

fetchAllData().then(data => {
  travelerData = data.travelerData;
  destinationData = data.destinationData;
  tripData = data.tripData;
})
  .catch(error => console.log(error.message))

// event listeners
  $('.login-btn').click(validateUser);

// functions

function validateUser() {
  console.log(tripData)
  $('.login').submit(e => {
    e.preventDefault();
  })
  let usernameInput = $('.username-input').val();
  let usernamePassword = $('.password-input').val();
  let numberedTravelers = [];
  for (let i = 0; i < 50; i++) {
    numberedTravelers.push(`traveler${i + 1}`)
  }
  if (usernameInput === 'agency' && usernamePassword === 'travel2020') {
  dom.hideContent('.login-form')
  } else if (numberedTravelers.includes(usernameInput) && usernamePassword === 'travel2020') {
    dom.hideContent('.login-form')
  }
}

export default fetchAllData;


//
