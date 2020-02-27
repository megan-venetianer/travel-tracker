import $ from 'jquery';

// ---------- css ----------
import './css/base.scss';

// ---------- images ----------
import './images/mountains-lake.jpg';
import './images/snow-mountains.jpg'

// function loginTraveler() {
//   fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/')
//   .then(response => response.json())
//   .then(data => console.log(data.travelers))
//   .catch(error => console.log(error))
// }



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
  // console.log(data.destinationData)
  travelerData = data.travelerData;
  destinationData = data.destinationData;
  tripData = data.tripData;
})
  .catch(error => console.log(error.message))

  console.log(travelerData)


export default fetchAllData;



// function getTraveler(allTravelers) {
//
// }




//
